import express, { Request, Response } from "express";
import { OrderStore, Order } from "../models/order";

const store = new OrderStore(); // this provides method from model

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const showOrders = await store.show(req.params.id);
    res.json(showOrders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      productId: req.body.productId,
      quantity: req.body.quantity,
      userId: req.body.userId,
      status: req.body.status,
    };
    const addOrder = await store.create(order);
    res.json(addOrder);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/order/:id", show);
  app.post("/order", create); // Debugging
};

export default orderRoutes;
