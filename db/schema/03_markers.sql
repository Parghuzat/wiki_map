DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  lat Decimal(8,6) NOT NULL,
  lng Decimal(9,6) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE);
