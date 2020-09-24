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
//middleware cookie
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

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

///////////////////////WELCOME ROUTE///////////////////////////////////////////////

app.get("/welcome", (req, res) => {
    console.log(req.session.userId);
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

    bc.hash(req.body.password).then((salted) => {
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
                    userId: rows[0].id,
                });

                //res.redirect("/");
            })
            .catch((err) => {
                console.log("err in register: ", err);
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
                            userId: rows[0].id,
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
                });
        })
        .catch((err) => {
            console.log("err in db.email", err);
        });
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
//////////////////////APP - USER //////////////////////////////////////////////////
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

app.listen(8080, function () {
    console.log("I'm here for you :)");
});
