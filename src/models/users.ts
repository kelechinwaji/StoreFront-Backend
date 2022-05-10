import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { type } from "os";
import client from "../database";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
};

const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
const pepper: string | undefined = process.env.BCRYPT_PASSWORD as string;

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
      const sql = "SELECT * FROM orders WHERE id = ($1) ";
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
        "INSERT INTO users (firstName, lastName, password, userName) VALUES ($1, $2, $3, $4) RETURNING *";
      const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
      //  const values = [ user.firstName, user.lastName, user.password, user.userName];
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
        user.userName,
      ]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create new user ${error}`);
    }
  }

  async update(id: string, firstName: string, lastName: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users SET firstname=($1), lastname=($2) WHERE id =${id} RETURNING *`;
      const values = [firstName, lastName];
      const result = await conn.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not update user ${error}`);
    }
  }

  async destroy(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users WHERE id = ${id} RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not delete user ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT password FROM users WHERE username = ($1)";
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
