const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:angela:twilight@localhost:5432/socialnetwork"
);

////////////////////////register//////////////////////////////////
module.exports.register = (first, last, email, password) => {
    return db.query(
        `
    INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
        [first, last, email, password]
    );
};

///////////////////login//////////////////////////////////////////
module.exports.email = (email) => {
    return db.query(`SELECT * FROM users WHERE email = ($1)`, [email]);
};

////////////////////get it all//////////////////////////////////////
module.exports.getUsers = () => {
    return db.query(`SELECT * FROM users`);
};

///////////////////insert reset code ////////////////////////////////
module.exports.insertCode = (email, code) => {
    return db.query(
        `
    INSERT INTO codes (email, code)
    VALUES ($1, $2)
    RETURNING *
    `,
        [email, code]
    );
};
