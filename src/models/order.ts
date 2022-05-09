import { compileFunction } from "vm";
import client from "../database";

export type Order = {
  id?: string;
  userId: string;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get orders ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get order with id: ${id} ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders ( userId, status) VALUES ($1, $2) RETURNING *";
      const values = [
        order.userId,
        order.status,
      ];
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create new order ${error}`);
    }
  }

  async showUsers(userId: string): Promise<Order>{
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ${userId}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not get user order ${error}`);
    }
  }

  async completedOrders(id: string): Promise<Order>{
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='complete'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not get completed order with id:${id}  ${error}`);
    }
  }

  async currentOrders(id: string): Promise<Order>{
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='complete'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not get completed order with id:${id}  ${error}`);
    }
  }

  async destroy(id: string): Promise<Order>{
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM orders WHERE id = ${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not delete order with id:${id}  ${error}`);
    }
  }
}
