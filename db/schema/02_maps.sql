DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL ,
  center_lat INTEGER NOT NULL,
  center_lng INTEGER NOT NULL,
  zoom INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
