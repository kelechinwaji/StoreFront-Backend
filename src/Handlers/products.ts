import express, { Request, Response } from "express";
import { ProductStore, Product } from "../models/products";

const store = new ProductStore(); // this provides method from model

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const showProduct = await store.show(req.params.id);
    res.json(showProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const addProduct = await store.create(product);
    res.json(addProduct);
  } catch (error) {
    

    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const fixedProduct = await store.update(req.params.id, product);
    res.json(fixedProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const fall = await store.destroy(req.params.id);
    res.json(fall);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const byCategory = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const addItems = await store.byCategory(category);
    res.json(addItems);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index); 
  app.get("/products/:id", show); 
  app.post("/products", create); 
  app.put("/products/:id", update); 
  app.delete("/products/:id", destroy);
  app.get("/product", byCategory); // Debugging
};

export default productRoutes;
