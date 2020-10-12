--createdb roundup
--psql -d roundup -f weekenders.sql;

DROP TABLE IF EXISTS weekenders;

CREATE TABLE weekenders (
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL,
    last VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    breakfast BOOLEAN,
    lunch BOOLEAN,
    dinner BOOLEAN,
    specialFood VARCHAR,
    yoga BOOLEAN,
    party BOOLEAN,
    message VARCHAR
 );