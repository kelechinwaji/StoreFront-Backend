import { type } from "os";
import client from "../database";

export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    password: string
}

export class userStore {
    async index(): Promise<User[]> {
        try {
          const conn = await client.connect();
          const sql = "SELECT * FROM users";
          const result = await conn.query(sql);
          conn.release();
          return result.rows;
        } catch (error) {
          throw new Error(`could not get users ${error}`);
        }
      }

      async show(id: string): Promise<User> {
        try {
          const conn = await client.connect();
          const sql = "SELECT * FROM orders WHERE id = ($1)";
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`could not get user with id: ${id} ${error}`);
        }
      }

      async create(user: User): Promise<User> {
        try {
          const conn = await client.connect();
          const sql =
            "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, ) RETURNING *";
          const values = [ user.firstName, user.lastName, user.password];
          const result = await conn.query(sql, values);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`could not create new user ${error}`);
        }
      }
}