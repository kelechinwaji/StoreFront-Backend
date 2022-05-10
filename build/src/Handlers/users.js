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
const users_1 = require("../models/users");
const verifyAuth_1 = require("../auth services/verifyAuth");
const store = new users_1.userStore(); // this provides method from model
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.index();
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        userName: req.body.username,
    };
    try {
        const newUser = yield store.create(addUser);
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname } = req.body;
    try {
        const updated = yield store.update(req.params.id, firstname, lastname);
        res.json(updated);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasteBin = yield store.destroy(req.params.id);
        res.json(wasteBin);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const user = {
        userName: req.body.username,
        password: req.body.password,
    };
    try {
        const result = yield store.authenticate(req.body.username, req.body.password);
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ user: result }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
});
const userRoutes = (app) => {
    app.get("/users", index);
    app.get("/user/:id", show);
    app.post("/users", create);
    app.post("/login", authenticate);
    app.patch("/user/:id", verifyAuth_1.verifyAuthToken, update); // debugging
    app.delete("/user/:id", verifyAuth_1.verifyAuthToken, destroy);
};
exports.default = userRoutes;
