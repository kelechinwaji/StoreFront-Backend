import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { userStore, User } from "../models/users";
import { verifyAuthToken } from "../auth services/verifyAuth";

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

const update = async (req: Request, res: Response) => {
  const { firstname, lastname } = req.body;
  try {
    const updated = await store.update(req.params.id, firstname, lastname);
    res.json(updated);
  } catch (error) {  
      console.log(error);
      
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const wasteBin = await store.destroy(req.params.id);
    res.json(wasteBin);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  //@ts-ignore
  const user: User = {
    userName: req.body.username,
    password: req.body.password,
  };
  try {
    const result = await store.authenticate(
      req.body.username,
      req.body.password
    );
    //@ts-ignore
    const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/user/:id", show);
  app.post("/users", create);
  app.post("/login", authenticate);
  app.patch("/user/:id", verifyAuthToken, update);// debugging
  app.delete("/user/:id", verifyAuthToken, destroy);
};

export default userRoutes;
