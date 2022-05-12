import express, { Request, Response } from "express";
import { verifyAuthToken } from "../auth services/verifyAuth";
import { OrderStore, Order } from "../models/orders";

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
      userId: req.body.userId,
      status: req.body.status,
    };

    const addOrder = await store.create(order);
    res.json(addOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const showUsers = async (req: Request, res: Response) => {
  try {
    const seeUser = await store.showUsers(req.params.id);
    res.json(seeUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const completedOrders = async (req: Request, res: Response) => {
  try {
    const comOrders = await store.completedOrders(req.params.id);
    res.json(comOrders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const currentOrders = async (req: Request, res: Response) => {
  try {
    const curOrders = await store.currentOrders(req.params.id);
    res.json(curOrders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const delOrder = await store.destroy(req.params.id);
    res.json(delOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/order/:id", show);
  app.post("/order", verifyAuthToken, create);
  app.get("/order/complete/:id",verifyAuthToken, completedOrders);
  app.get("/order/current/:id", verifyAuthToken, currentOrders);
  app.get("/order/show/user/:id", verifyAuthToken, showUsers);
  app.delete("/order/:id", verifyAuthToken, destroy); 
};

export default orderRoutes;
