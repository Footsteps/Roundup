--psql -d roundup -f vis.sql;

DROP TABLE IF EXISTS vis;

CREATE TABLE vis (
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL,
    last VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    freitagA VARCHAR,
    samstagF VARCHAR,
    samstagM VARCHAR,
    samstagA VARCHAR,
    sonntagF VARCHAR,
    sonntagM VARCHAR,
    specialFood VARCHAR,
    yoga VARCHAR,
    party VARCHAR,
    mess VARCHAR
 );