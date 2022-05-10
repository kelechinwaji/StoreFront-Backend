import express from "express";
import orderRoutes from "./Handlers/order";
import productRoutes from "./Handlers/products";
import userRoutes from "./Handlers/users";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

productRoutes(app);
orderRoutes(app);
userRoutes(app);

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});

export default app;
