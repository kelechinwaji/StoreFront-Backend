import { compileFunction } from "vm";
import client from "../database";


export type Order ={
    id: string,
    quantity: string,
    userId: string,
    status: string
}

export class OrderStore{
    async index(): Promise<Order[]>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`could not get orders ${error}`);
        }
    }

    async show(id: string): Promise<Order>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`could not get order with id: ${id} ${error}`);
        }
    }

    async create(order:Order): Promise<Order>{
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (quantity, userId, status) VALUES ($1, $2, $3) RETURNING *';
            const values = [order.quantity, order.userId, order.status];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`could not create new order ${error}`);
        }
    }
}