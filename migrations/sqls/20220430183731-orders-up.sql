/* Replace with your SQL commands */
CREATE TABLE orders(
 id SERIAL PRIMARY KEY,
 user_id BIGINT REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
 status VARCHAR(50) DEFAULT 'Active'
)
