--psql -d roundup -f chat.sql;

DROP TABLE IF EXISTS chat;


CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    topic VARCHAR NOT NULL,
    mess VARCHAR NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
