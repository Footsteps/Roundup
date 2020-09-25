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

////////////////////get user data (App loads)//////////////////////////////////////
module.exports.getUser = (id) => {
    return db.query(
        `SELECT id, first, last, imageUrl, bio FROM users
    WHERE id = ($1)`,
        [id]
    );
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

///////////////////SELECT RESET CODE ////////////////////////////////////
module.exports.getCode = (email) => {
    return db.query(
        `
    SELECT *, (
        SELECT code FROM codes
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        ORDER BY email DESC
        LIMIT 1
    ) AS "lastCode"
     FROM codes
    WHERE email = ($1)

    `,
        [email]
    );
};

////////////////replace password////////////////////////////
module.exports.updatePassword = (email, password) => {
    return db.query(
        `
    UPDATE users SET password = $2
    WHERE email = $1
    RETURNING *
    `,
        [email, password]
    );
};

////////////////UPDATE IMAGE////////////////////////////
module.exports.updateImage = (url, id) => {
    return db.query(
        `
    UPDATE users SET imageUrl = $1
    WHERE id = $2
    RETURNING *
    `,
        [url, id]
    );
};

////////////////////ADD A BIO/////////////////////////////
module.exports.bio = (bio, id) => {
    return db.query(
        `
    UPDATE users SET bio = $1
    WHERE id = $2
    RETURNING bio
    `,
        [bio, id]
    );
};
