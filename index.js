//server-stuff, node-server build with express

const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const crs = require("crypto-random-string");
//sendEmail("slender.trade+123@spicedling.email", "i like you", "will you marry me");

//import socket: change server a little bit so that socket.io is able to work with it
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

//picture stuff
const s3 = require("./s3");
const { s3Url } = require("./config");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//without express.json req.body will just be an empty object

app.use(express.static("./public"));

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

//middleware cookie - changed for using socket --> to give it access to our cookie session

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//do csurf after cookie!!!
//use axios with token now --> own module which needs to required
app.use(csurf());

app.use(function (req, res, next) {
    //console.log("token", req.csrfToken());
    res.cookie("mytoken", req.csrfToken());
    next();
}); //whenever a request comes in, token gets overwritten

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//add cookie-session middleware :)
//refer to petition

//add captcha stuff
require("es6-promise").polyfill();
require("isomorphic-fetch");

//////////////////CAPTCHA////////////////////////////////////////////////////////
app.post("/captcha", async (req, res) => {
    console.log("captcha got hit,", req.body.value);
    const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY;
    const humanKey = req.body.value;

    try {
        const isHuman = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=utf-8",
                },
                body: `secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`,
            }
        );
        console.log(typeof res);
        (res) => res.json();
        (json) => json.success;
        if (humanKey === null || !isHuman) {
            console.log("not hujman!!!!");
        }
    } catch (e) {
        console.log("error in checking if human");
    }

    // The code below will run only after the reCAPTCHA is succesfully validated.
    //console.log("SUCCESS!");
});

///////////////////////WELCOME ROUTE///////////////////////////////////////////////

app.get("/welcome", (req, res) => {
    console.log("res.session.userID:", req.session.userId);
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

///////////////////////////REGISTRATION///////////////////////////////////////////

app.post("/register", (req, res) => {
    console.log("post request to registration route happend!!!");
    console.log("req.body: ", req.body);

    bc.hash(req.body.password)
        .then((salted) => {
            console.log("salted: ", salted);
            db.register(req.body.first, req.body.last, req.body.email, salted)
                .then(({ rows }) => {
                    console.log("rows in register!!!", rows[0].id);

                    req.session.userId = rows[0].id;
                    console.log(
                        "req.session with cookie userId: ",
                        req.session.userId
                    );

                    res.json({
                        success: true,
                    });
                })
                .catch((err) => {
                    console.log("err in register: ", err);
                    if (
                        err ==
                        'error: duplicate key value violates unique constraint "users_email_key"'
                    ) {
                        console.log("err dublicate key!!!");
                        res.json({
                            email: true,
                        });
                    } else {
                        res.json({
                            success: false,
                        });
                    }
                });
        })
        .catch((err) => {
            console.log("err in bc hash!!!!", err);
            res.json({
                success: false,
            });
        });
});

//////////////////////LOGIN//////////////////////////////////////////////////
app.get("/login", (req, res) => {
    console.log("get request to login happened!!!");
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", (req, res) => {
    console.log("post request to login route happend!!!");
    console.log("req.body in login: ", req.body);

    let hash;

    db.email(req.body.email)
        .then(({ rows }) => {
            console.log("rows: ", rows[0]);
            console.log("password in rows: ", rows[0].password);
            console.log("password in req.body: ", req.body.password);
            hash = rows[0].password;
            console.log("hash: ", hash);

            bc.compare(req.body.password, rows[0].password)
                .then((result) => {
                    if (result == true) {
                        console.log("password works!!!!");
                        req.session.userId = rows[0].id;
                        console.log("req.session.userId: ", req.session.userId);
                        console.log("req.session in dbemail: ", req.session);
                        res.json({
                            success: true,
                        });
                    } else {
                        console.log("password did NOT work!!!");
                        res.json({
                            success: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log("err in bc compare: ", err);
                    res.json({
                        success: false,
                    });
                });
        })
        .catch((err) => {
            console.log("err in db.email", err);
            res.json({
                success: false,
            });
        });
});

////////////////////LOGOUT////////////////////////////////////////////
app.post("/logout", (req, res) => {
    console.log("logout is happening!!");
    req.session.userId = null;
    res.sendStatus(200);
});

//////////////////////RESET PASSWORD/////////////////////////////////
app.post("/reset", (req, res) => {
    console.log("post request to login route happend!!!");
    console.log("req.body in login: ", req.body);

    db.email(req.body.email)
        .then(({ rows }) => {
            console.log("rows in post reset: ", rows[0]);
            if (rows[0] == undefined) {
                console.log("this email does not exist!!!");

                res.json({
                    success: false,
                });
            } else {
                console.log("this worked!!!");
                //generate code//
                let code;
                code = crs({ length: 6 });
                console.log("random code: ", code);

                //store code in table
                db.insertCode(rows[0].email, code)
                    .then(({ rows }) => {
                        console.log("email from insertCode: ", rows[0].email);
                        console.log("code from insertCode: ", rows[0].code);

                        //send email
                        sendEmail(
                            rows[0].email,
                            "Code for Password Reset",
                            `Please enter this code if asked: ${rows[0].code}. It is about the password reset :).`
                        );

                        //send response to render the next stage

                        res.json({
                            successCode: true,
                        });
                    })
                    .catch((err) => {
                        console.log("err in insertCode", err);
                    });
            }
        })
        .catch((err) => {
            console.log("err in db.email", err);
        });
});

//////////////////////ENTERED RESET CODE/////////////////////////////////
app.post("/code", (req, res) => {
    console.log("post request to code route happend!!!");
    console.log("req.body in code: ", req.body);

    db.getCode(req.body.email)
        .then(({ rows }) => {
            console.log("rows in post code: ", rows[0].lastCode);

            if (rows[0].lastCode != req.body.code) {
                console.log("this code does not exist!!!");

                res.json({
                    success: false,
                });
            } else if (rows[0].lastCode == req.body.code) {
                console.log("this worked!!!");
                bc.hash(req.body.newPassword)
                    .then((salted) => {
                        console.log("salted: ", salted);
                        db.updatePassword(req.body.email, salted)
                            .then((results) => {
                                console.log(
                                    "results in update Password",
                                    results
                                );

                                res.json({
                                    success: true,
                                });
                            })
                            .catch((err) => {
                                console.log("err in update Password", err);
                            });
                    })
                    .catch((err) => {
                        console.log("err in bc hash", err);
                    });
            }
        })
        .catch((err) => {
            console.log("err in db.getCode", err);
        });
});
//////////////////////APP - get USER data //////////////////////////////////////////////////
app.get("/user", async (req, res) => {
    console.log("get request to App user route happened!!!");
    console.log("req.session.userId in get user", req.session.userId);
    let data;
    try {
        const { rows } = await db.getUser(req.session.userId);
        data = rows[0];
        console.log(data);
        res.json({
            data,
        });
    } catch (e) {
        res.json({ error: true });
    }
});

/////////////////////UPLOAD PICTURE///////////////////////////////////////////

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("post request upload image happened!!!!");
    console.log("file", req.file);
    /*
                        file {
                    fieldname: 'file',
                    originalname: 'Vietnam1_ausschnitt.jpg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: '/home/angela/Schreibtisch/spicedfiles/cumin-socialnetwork/uploads',
                    filename: 'jDO8ZhR76vz1zG5t08-zzKdOhGpCvUhv.jpg',
                    path: '/home/angela/Schreibtisch/spicedfiles/cumin-socialnetwork/uploads/jDO8ZhR76vz1zG5t08-zzKdOhGpCvUhv.jpg',
                    size: 60897
                    }
                    */
    console.log("req.body id", req.body.id);
    //id: "1"
    const filename = req.file.filename;
    console.log("filename", filename);
    const url = `${s3Url}${filename}`;
    console.log("url", url);
    console.log("file is there, giving it to updateImage now");
    db.updateImage(url, req.body.id)
        .then(({ rows }) => {
            console.log("results after updating image", rows[0].imageurl);
            res.json({ imageurl: rows[0].imageurl });
        })
        .catch((err) => {
            console.log("err in updateimage", err);
            res.json({ error: true });
        });
});

//////////////////////ADD BIO/////////////////////////////////////////////////
app.post("/bio", async (req, res) => {
    console.log("post request to bio route happend!!!");
    console.log("req.body in login: ", req.body);
    try {
        const { rows } = await db.bio(req.body.newBio, req.body.id);
        console.log("rows: ", rows[0].bio);

        res.json({
            newBio: rows[0].bio,
            success: true,
        });
    } catch (e) {
        console.log("err in db bio");

        res.json({
            success: false,
        });
    }
});

/////////////////////GET /user/:id//////////////////////////////////////////////
app.get("/api/user/:otherUserId", async (req, res) => {
    //console.log("req.params.otherUserId: ", req.params.otherUserId);
    //console.log("req.session.userId: ", req.session.userId);
    //triggers if logged in - user is the same as requested user
    if (req.params.otherUserId == req.session.userId) {
        res.json({
            sameUser: true,
        });
    } else {
        try {
            const { rows } = await db.getOtherUser(req.params.otherUserId);
            console.log("rows in get other user line 380", rows[0]);
            //triggers if user does not exist or req.params is not a number
            if (rows[0] == undefined) {
                console.log("user does not exist!!!");
                res.json({ noUser: true });
            } else {
                res.json({
                    data: rows[0],
                });
            }
        } catch (err) {
            console.log("err in get other user", err);
            res.json({
                success: false,
            });
        }
    }
});

/////////////////////FIND THE 3 USERS REGISTERED RECENTLY//////////////////////////////////////////////
app.get("/users/:userInput", async (req, res) => {
    console.log("req.params ", req.params.userInput);
    if (req.params.userInput == "undefined") {
        try {
            const { rows } = await db.getThree();
            console.log("rows", rows);
            res.json({
                data: rows,
            });
        } catch (err) {
            console.log("err in get 3 users", err);
        }
    } else {
        try {
            const { rows } = await db.getMatchingUsers(req.params.userInput);
            console.log("rows", rows[0]);
            if (rows[0] == undefined) {
                console.log("no search results!!!");
                res.json({
                    success: false,
                });
            } else {
                res.json({
                    data: rows,
                });
            }
        } catch (err) {
            console.log("err in find users", err);
        }
    }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////FRIENDSHIP ROUTES/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/////////////////////GET to friendships-table//////////////////////////////////////////////
app.get("/initial-friendship-status/:otherUserId", async (req, res) => {
    /*console.log(
        "req.params.otherUserId recipient_id: ",
        req.params.otherUserId
    );*/
    //console.log("req.session.userId : sender_id", req.session.userId);
    try {
        const { rows } = await db.inFriendships(
            req.params.otherUserId,
            req.session.userId
        );
        console.log("rows[0] in dbfriendships line 426", rows[0]);
        //now I need rows to tell me about the relationship.

        if (rows[0] == undefined) {
            console.log("friendship does not exist!!!");
            res.json({ success: false });
        } else {
            console.log("users are in friendships table!!!");
            res.json({
                success: true,
                data: rows[0],
            });
        }
    } catch (err) {
        console.log("err in db in table", err);
    }
});

/////////////////////POST make friend-request//////////////////////////////////////////////

app.post("/send-friend-request/:otherUserId", async (req, res) => {
    console.log("send friend request was made!!! line 446");
    console.log(
        "req.params.otherUserId recipient_id: ",
        req.params.otherUserId
    );
    console.log("req.session.userId : sender_id", req.session.userId);

    try {
        const { rows } = await db.makeRequest(
            req.session.userId,
            req.params.otherUserId
        );
        console.log("rows[0] in dbfriendships line 426", rows[0]);
        //now I need rows to tell me about the relationship.

        res.json({ success: true });
    } catch (err) {
        console.log("err in make request", err);
    }
});

/////////////////////POST accept friend-request//////////////////////////////////////////////

app.post("/accept-friend-request/:otherUserId", async (req, res) => {
    console.log("accept friend request was made!!! line 446");
    //console.log("req.params.otherUserId sender_id: ", req.params.otherUserId);
    //console.log("req.session.userId : recipient_id", req.session.userId);

    try {
        const { rows } = await db.acceptRequest(
            req.params.otherUserId,
            req.session.userId
        );
        console.log("rows in dbfriendships line 481", rows[0].sender_id);
        //now I need rows to tell me about the relationship.

        res.json({ success: true, id: rows[0].sender_id });
    } catch (err) {
        console.log("err in make request", err);
    }
});

/////////////////////POST end friend-request//////////////////////////////////////////////

app.post("/end-friendship/:otherUserId", async (req, res) => {
    console.log("end friend request was made!!! line 493");
    console.log("req.params.otherUserId: recipient ", req.params.otherUserId);
    console.log("req.session.userId : sender", req.session.userId);

    try {
        const { rows } = await db.endFriendship(
            req.session.userId,
            req.params.otherUserId
        );
        console.log("rows[0] in end friendship line 516", rows[0]);

        res.json({ success: true, id: req.params.otherUserId });
    } catch (err) {
        console.log("err in make request", err);
    }
});

app.get("/get-connections", async (req, res) => {
    //console.log("req.session.userId : sender_id", req.session.userId);
    try {
        const { rows } = await db.receiveConnections(req.session.userId);
        console.log("rows in receive connections line 530", rows);

        if (rows[0] == undefined) {
            console.log("no connections yet");
            res.json({ success: false });
        } else {
            console.log("connections have been made");
            res.json({
                success: true,
                data: rows,
            });
        }
    } catch (err) {
        console.log("err in db in receive connections", err);
    }
});

//////////////////////delete profile////////////////////////////////////
app.post("/delete", async (req, res) => {
    console.log("post request to delete route happened!!!");
    console.log("req.session.userId in get user", req.session.userId);

    try {
        const chat = await db.deleteChat(req.session.userId);
        //console.log("result from delete chatmessages", chat);
        const friend = await db.deleteFriendship(req.session.userId);
        //console.log("result from delete friendship", friend);
        const user = await db.deleteUser(req.session.userId);
        //console.log("result from delete user", user);
        req.session.userId = null;
        res.sendStatus(200);
    } catch (e) {
        console.log("err in delete!!", e);
    }
});

////////////apply-daily guests///////////////////////////////////////////
app.post("/apply", async (req, res) => {
    console.log("post request to apply route happend!!!");
    console.log("req.body in apply: ", req.body);
    console.log("req.body in apply: ", req.body.language);

    try {
        const { rows } = await db.addVisitor(
            req.body.first,
            req.body.last,
            req.body.email,
            req.body.freitagA,
            req.body.samstagF,
            req.body.samstagM,
            req.body.samstagA,
            req.body.sonntagF,
            req.body.sonntagM,
            req.body.specialFood,
            req.body.yoga,
            req.body.party,
            req.body.message
        );
        console.log("data after inserting visitor", rows[0]);

        if (req.body.language == "en-US") {
            console.log("language english!!");
            if (rows[0].freitaga == null) {
                rows[0].freitaga = "";
            } else {
                rows[0].freitaga = "friday dinner ";
            }
            if (rows[0].samstagf) {
                rows[0].samstagf = "-satuday breakfast ";
            } else {
                rows[0].samstagf = "";
            }
            if (rows[0].samstagm) {
                rows[0].samstagm = "-saturday lunch ";
            } else {
                rows[0].samstagm = "";
            }
            if (rows[0].samstaga) {
                rows[0].samstaga = "-saturday dinner ";
            } else {
                rows[0].samstaga = "";
            }
            if (rows[0].sonntagf) {
                rows[0].sonntagf = "-sunday breakfast ";
            } else {
                rows[0].sonntagf = "";
            }
            if (rows[0].sonntagm) {
                rows[0].sonntagm = "-sunday lunch ";
            } else {
                rows[0].sonntagm = "";
            }
            if (rows[0].specialfood) {
                rows[0].specialfood = "-special food is needed ";
            } else {
                rows[0].specialfood = "";
            }
            if (rows[0].yoga) {
                rows[0].yoga = "-Yoga ";
            } else {
                rows[0].yoga = "";
            }
            if (rows[0].party) {
                rows[0].party = "-you'd like to contribute to the party ";
            } else {
                rows[0].party = "";
            }
            if (!rows[0].mess) {
                rows[0].mess = "";
            } else {
                rows[0].mess = `And you left this message: ${req.body.message}`;
            }

            try {
                const mail = await sendEmail(
                    rows[0].email,
                    "your schwanberg-booking",
                    `Hi ${rows[0].first}! 
                    Thank you so much for your booking! 
                    Vera will get back to you shortly.
                    
                    Just to be sure, this is the info we got from you:
                    ${rows[0].freitaga}
                    ${rows[0].samstagf}
                    ${rows[0].samstagm}
                    ${rows[0].samstaga}
                    ${rows[0].sonntagf}
                    ${rows[0].sonntagm}
                    ${rows[0].specialfood}
                    ${rows[0].yoga}
                    ${rows[0].party}
                    ${rows[0].mess}.
            
            All the best and thank you! 
            Your Schwanberg-team!`
                );
            } catch (err) {
                console.log("err in sendMail to visitor", err);
            }
            var mailOrga = "slender.trade+a@spicedling.email";
            var nameOrga = "Vera";
        } else {
            console.log("language is german!!!");

            if (rows[0].freitaga == null) {
                rows[0].freitaga = "";
            } else {
                rows[0].freitaga = "- Abendessen Freitag ";
            }
            if (rows[0].samstagf) {
                rows[0].samstagf = "- Frühstück Samstag ";
            } else {
                rows[0].samstagf = "";
            }
            if (rows[0].samstagm) {
                rows[0].samstagm = "- Mittagessen Samstag ";
            } else {
                rows[0].samstagm = "";
            }
            if (rows[0].samstaga) {
                rows[0].samstaga = "- Abendessen Samstag ";
            } else {
                rows[0].samstaga = "";
            }
            if (rows[0].sonntagf) {
                rows[0].sonntagf = "- Frühstück Sonntag ";
            } else {
                rows[0].sonntagf = "";
            }
            if (rows[0].sonntagm) {
                rows[0].sonntagm = "- Mittagessen Sonntag ";
            } else {
                rows[0].sonntagm = "";
            }
            if (rows[0].specialfood) {
                rows[0].specialfood = "- Sonderkost ";
            } else {
                rows[0].specialfood = "";
            }
            if (rows[0].yoga) {
                rows[0].yoga = "- Yoga";
            } else {
                rows[0].yoga = "";
            }
            if (rows[0].party) {
                rows[0].party = "- Beitrag bunter Abend ";
            } else {
                rows[0].party = "";
            }
            if (!rows[0].mess) {
                rows[0].mess = "";
            } else {
                rows[0].mess = `Eine Nachricht: ${req.body.message}`;
            }
            console.log("my new Obj after renaming", rows[0]);

            try {
                const mail = await sendEmail(
                    rows[0].email,
                    "Deine Anmeldung",
                    `Liebe ${rows[0].first}! 
            Danke für deine Anmeldung!
            Vera wird sich bald bei dir melden. 
                
            Hier nochmal eine Zusammenfassung, was bisher bei uns angekommen ist: 
            ${rows[0].freitaga}
            ${rows[0].samstagf}
            ${rows[0].samstagm}
            ${rows[0].samstaga}
            ${rows[0].sonntagf}
            ${rows[0].sonntagm}
            ${rows[0].specialfood}
            ${rows[0].yoga}
            ${rows[0].party}
            ${rows[0].mess} 
            
            
            
            Alles Liebe und vielen Dank!
            
            Das Schwanberg-Team`
                );
            } catch (err) {
                console.log("err in sendMail to visitor", err);
                res.json({
                    success: false,
                });
            }
            var mailOrga = "slender.trade+a@spicedling.email";
            var nameOrga = "Vera";
        }
        try {
            const mail = await sendEmail(
                mailOrga,
                "Eine Anmeldung",
                `Hi ${nameOrga}:)

                ${rows[0].first} ${rows[0].last} hat sich angemeldet! 
                Ihre Mail-Adresse: ${rows[0].email}. 
                
                Hier eine Zusammenfassung, was bisher bei uns angekommen ist: 
                ${rows[0].freitaga}
                ${rows[0].samstagf}
                ${rows[0].samstagm}
                ${rows[0].samstaga}
                ${rows[0].sonntagf}
                ${rows[0].sonntagm}
                ${rows[0].specialfood}
                ${rows[0].yoga}
                ${rows[0].party}
                ${rows[0].mess}. 
                
                Alles Liebe und vielen Dank!`
            );
            res.json({
                visitorSuccess: true,
            });
        } catch (err) {
            console.log("err in sendMail to organizer", err);
            res.json({
                success: false,
            });
        }
    } catch (err) {
        console.log("err in add visitor to table", err);
        res.json({
            success: false,
        });
    }
    //send response to render the next stage

    //slender.trade+a@spicedling.email 12345  (admin)
    //slender.trade+v@spicedling.email 12345  (Gast)
});

///////////////DO NOT DELETE////////////////////////////////////////////////

////////////////////* ROUTE //////////////////////////////////////////////////
//this route is running if user manually puts slash into url bar this will run
app.get("*", function (req, res) {
    //if user is not logged in
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
///////////////////////////////////////////////////////////////////////////////

server.listen(8080, function () {
    console.log("I'm here for you :)");
});

//////////////////////socket code//////////////////////////////////////////////
//socket is listening whenveer we connect

io.on("connection", function (socket) {
    //sanity check
    console.log(`socket.id ${socket.id} is now connected`);

    //sanity check if socket only has access to store if user is logged in
    //this is why we reconfigured our cookie session middleware
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    //retrieve last 10 messages: db.getLastTenMessages
    //from users: first name, last name, imageurl
    //from chat tables: chat messages
    //most recent message should be located at the bottom --> either in db or use reverse method
    db.getChatTopics().then(({ rows }) => {
        console.log("chattopcs!!! in line 618", rows[0]);
        socket.emit("chatTopics", rows);
    });

    db.getChatMessages().then(({ rows }) => {
        //console.log("chatMessages in line 591", rows);
        socket.emit("chatMessages", rows);
    });

    //1 arg: message (in this case coming from from chat.js)
    //2nd arg: value that comes along with the message
    socket.on("newMessage", async (newMessage) => {
        console.log("newMessage from chat.js component!!", newMessage);
        //who send the message???

        console.log(
            "User who send the message: ",
            socket.request.session.userId
        );
        console.log("topic: ", newMessage.topic);
        console.log("message: ", newMessage.message);

        try {
            const { rows } = await db.newMessage(
                socket.request.session.userId,
                newMessage.topic,
                newMessage.message
            );
            console.log("rows in insert new chat message line 610", rows);

            try {
                const { rows } = await db.getNewMessage(
                    socket.request.session.userId
                );
                console.log("rows in getNewMessage line 615", rows);
                socket.emit("addNewMessage", rows[0]);
            } catch (err) {
                console.log("err in getting newest message-user", err);
            }
        } catch (err) {
            console.log("err in insert new Chat message, line 610", err);
        }

        //do a query to get info about the user! (first, last, name, imageurl)
        //make sure tht new chat message object looks like the one we received from getLastTenMessages
        //emt the message: io.socket.emit("addChatMessage", obj);
        //
    });

    socket.on("chatMessagesByTopic", async (chatMessagesByTopic) => {
        console.log("topic was clicked, message", chatMessagesByTopic.topic);
        try {
            const { rows } = await db.chatMessagesByTopic(
                chatMessagesByTopic.topic
            );
            console.log(rows);
            socket.emit("chatMessagesByTopic", rows);
        } catch (err) {
            console.log("err in getting messges by topic");
        }
    });
});
