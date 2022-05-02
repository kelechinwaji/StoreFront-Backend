import express from "express";
import productRoutes from "./Handlers/products";


const app = express();
const PORT = 5000;
app.use(express.json())
app.use(express.urlencoded({extended: false}))

productRoutes(app);

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});

export default app;

