import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { userStore, User } from "../models/users";

const store = new userStore(); // this provides method from model

const index = async (req: Request, res: Response) => {
  try {
    const user = await store.index();
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const addUser: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    userName: req.body.username,
  };
  try {
    const newUser = await store.create(addUser);
      //@ts-ignore
      const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);

    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) =>{
    try {
        const result = await store.authenticate(req.body.username, req.body.password)
        res.json(result);
    } catch (error) {
        res.status(401);
        res.json(error)
    }
}

const userRoutes = (app: express.Application) => {
  // app.get("/products", index);
  // app.get("/products/:id", show);
  app.post("/users", create);
  app.post("/login", authenticate);
  // app.delete("/products/:id", destroy);
  // app.get("/product", byCategory); // Debugging
};

export default userRoutes;
