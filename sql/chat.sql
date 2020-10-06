--psql -d socialnetwork -f chat.sql;

DROP TABLE IF EXISTS chat;


CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    mess VARCHAR NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
