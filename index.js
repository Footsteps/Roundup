//server-stuff, node-server build with express

const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc");
const csurf = require("csurf");

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
            //console.log("rows: ", rows[0]);
            //console.log("password in rows: ", rows[0].password);
            //console.log("password in req.body: ", req.body.password);
            hash = rows[0].password;
            //console.log("hash: ", hash);

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

app.listen(8080, function () {
    console.log("I'm here for you :)");
});
