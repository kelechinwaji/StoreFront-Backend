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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`could not get orders ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id = ($1)";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not get order with id: ${id} ${error}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO orders ( user_id, status) VALUES ($1, $2) RETURNING *";
                const values = [order.userId, order.status];
                const result = yield conn.query(sql, values);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not create new order ${error}`);
            }
        });
    }
    showUsers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE user_id = ${userId}`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not get user order ${error}`);
            }
        });
    }
    completedOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='complete'`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not get completed order with id:${id}  ${error}`);
            }
        });
    }
    currentOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='complete'`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not get completed order with id:${id}  ${error}`);
            }
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM orders WHERE id = ${id}`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not delete order with id:${id}  ${error}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
