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

////////////////GET OTHER USERS NAME, BIO, PIC///////////
module.exports.getOtherUser = (id) => {
    return db.query(
        `SELECT first, last, imageUrl, bio FROM users
    WHERE id = ($1)`,
        [id]
    );
};

//////////////////find the 3 users that registered recently///////////////////////////////
module.exports.getThree = () => {
    return db.query(
        `SELECT * FROM users
        ORDER BY id DESC
        LIMIT 3;`
    );
};

///////////////////////find users depending on last name or first name////////////////////////
module.exports.getMatchingUsers = (userInput) => {
    return db.query(
        `SELECT first, last, imageUrl, bio FROM users WHERE first ILIKE $1
    OR last ILIKE $1
    LIMIT 10;`,
        [userInput + "%"]
    );
};

////////////////////////////////////////////////////////////////////////////////////
//////////////FRIENDSHIPS//////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/////////if users in table////////////////////////////////
module.exports.inFriendships = (recipient_id, sender_id) => {
    return db.query(
        `SELECT * FROM friendships
  WHERE (recipient_id = $1 AND sender_id = $2)
  OR (recipient_id = $2 AND sender_id = $1);`,
        [recipient_id, sender_id]
    );
};

///////////insert make-friend-request///////////////////////////////////////////////
module.exports.makeRequest = (sender_id, recipient_id) => {
    return db.query(
        `
    INSERT INTO friendships (sender_id, recipient_id)
    VALUES ($1, $2)
    RETURNING *
    `,
        [sender_id, recipient_id]
    );
};

///////////accept friend-request////////////////////////////////////////
module.exports.acceptRequest = (sender_id, recipient_id) => {
    return db.query(
        `
    UPDATE friendships 
    SET accepted = TRUE
    WHERE (recipient_id = $2 AND sender_id = $1)
    RETURNING *
    `,
        [sender_id, recipient_id]
    );
};

///////////end friendship////////////////////////////////////////
module.exports.endFriendship = (sender_id, recipient_id) => {
    return db.query(
        `DELETE FROM friendships 
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        RETURNING *`,
        [sender_id, recipient_id]
    );
};

///////////////////get friends & wannabes/////////////////////////
//first joint get all the pending requests where the logged in user is the receiver

module.exports.receiveConnections = (user_id) => {
    return db.query(
        `SELECT users.id, first, last, imageurl, accepted
  FROM friendships
  JOIN users
  ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,
        [user_id]
    );
};
