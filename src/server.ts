import { Request, Response } from 'express';
import express from "express";
import orderRoutes from "./Handlers/orders";
import productRoutes from "./Handlers/products";
import userRoutes from "./Handlers/users";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

productRoutes(app);
orderRoutes(app);
userRoutes(app);

app.get('/', async (req: Request, res: Response) => {
  res.send(
    'Welcome to FORTE. A list of endpoint are available to be accessed: /products, /users, /orders.'
  );
});

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});

export default app;
