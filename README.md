# StoreFront-Backend


-- CREATE TABLE order_products(
--     id serial PRIMARY KEY, 
--     quantity integer NOT NULL, 
--     order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
-- )

-- CREATE TABLE orders(
--  id SERIAL PRIMARY KEY,
--  user_id BIGINT REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
--  status VARCHAR(50) DEFAULT 'Active'
-- )

CREATE TABLE users(
--  id SERIAL PRIMARY KEY,
--  firstName VARCHAR(100) NOT NULL,
--  lastName VARCHAR(100) NOT NULL,
--  password integer,
--  UserName VARCHAR(50)
-- )

CREATE TABLE products(
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 price integer NOT NULL,
 category VARCHAR(100) NOT NULL
)

 