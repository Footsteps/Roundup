--psql -d roundup -f visitors.sql;

DROP TABLE IF EXISTS visitors;

CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL,
    last VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    
    freitagA BOOLEAN,
    
    samstagF BOOLEAN,
    samstagM BOOLEAN,
    samstagA BOOLEAN,
    
    sonntagF BOOLEAN,
    sonntagM BOOLEAN,
    specialFood VARCHAR,
    yoga BOOLEAN,
    party BOOLEAN,
    message VARCHAR
 );