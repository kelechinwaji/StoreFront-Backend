import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

//@ts-ignore
export const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader?.split(" ")[1];
      //@ts-ignore
      const decoded = Jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (error) {
      res.status(401);
      res.json({error})
    }
  };