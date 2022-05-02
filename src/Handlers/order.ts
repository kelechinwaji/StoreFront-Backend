import express, { Request, Response } from "express";
import { OrderStore, Order } from "../models/order";

const store = new OrderStore(); // this provides method from model