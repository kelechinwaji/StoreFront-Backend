"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore(); // this provides method from model
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showOrders = yield store.show(req.params.id);
        res.json(showOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            userId: req.body.userId,
            status: req.body.status,
        };
        const addOrder = yield store.create(order);
        res.json(addOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const showUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seeUser = yield store.showUsers(req.params.id);
        res.json(seeUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const completedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comOrders = yield store.completedOrders(req.params.id);
        res.json(comOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const currentOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const curOrders = yield store.currentOrders(req.params.id);
        res.json(curOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delOrder = yield store.destroy(req.params.id);
        res.json(delOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const orderRoutes = (app) => {
    app.get("/orders", index);
    app.get("/order/:id", show);
    app.post("/order", create);
    app.get("/order/complete/:id", completedOrders);
    app.get("/order/current/:id", currentOrders);
    app.get("/order/show/user/:id", showUsers);
    app.delete("/order/:id", destroy); // Debugging
};
exports.default = orderRoutes;
