--psql -d socialnetwork -f codes.sql;

DROP TABLE IF EXISTS codes;


CREATE TABLE codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );


