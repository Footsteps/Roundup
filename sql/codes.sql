--psql -d roundup -f codes.sql;

DROP TABLE IF EXISTS codes;


CREATE TABLE codes (
   id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL REFERENCES users(email),
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );


