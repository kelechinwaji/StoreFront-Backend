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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuth_1 = require("../auth services/verifyAuth");
const products_1 = require("../models/products");
const store = new products_1.ProductStore(); // this provides method from model
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showProduct = yield store.show(req.params.id);
        res.json(showProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const authorizationHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        //@ts-ignore
        jsonwebtoken_1.default.verify(authorizationHeader, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(401);
        res.json(`Invalid token ${error}`);
        return;
    }
    try {
        const addProduct = yield store.create(product);
        res.json(addProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const fixedProduct = yield store.update(req.params.id, product);
        res.json(fixedProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fall = yield store.destroy(req.params.id);
        res.json(fall);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const byCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category;
        const addItems = yield store.byCategory(category);
        res.json(addItems);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const productRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", verifyAuth_1.verifyAuthToken, create);
    app.put("/products/:id", verifyAuth_1.verifyAuthToken, update);
    app.delete("/products/:id", verifyAuth_1.verifyAuthToken, destroy);
    app.get("/product", byCategory); // Debugging
};
exports.default = productRoutes;
