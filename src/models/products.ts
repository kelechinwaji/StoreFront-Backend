import { type } from "os";
import client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: string;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products RETURNING *";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get products ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get products with id: ${id}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const values = [product.name, product.price, product.category];
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create new product ${error}`);
    }
  }

  async update(id: string, product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE products SET name = ($1), price = ($2), category = ($3)  WHERE id = ${id} RETURNING *`;
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not update product ${error}`);
    }
  }

  async destroy(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id = ($1)";
      const result = await client.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not delete product ${error}`);
    }
  }

  async byCategory(category: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE category = ${category}`;
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get product category :${category}, ${error}`);
    }
  }
}
