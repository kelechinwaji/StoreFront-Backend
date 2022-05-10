"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = __importDefault(require("./Handlers/order"));
const products_1 = __importDefault(require("./Handlers/products"));
const users_1 = __importDefault(require("./Handlers/users"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, products_1.default)(app);
(0, order_1.default)(app);
(0, users_1.default)(app);
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`);
});
exports.default = app;
