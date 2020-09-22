//server-stuff, node-server build with express

const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc");

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
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("post request to registration route happend!!!");
    console.log("req.body: ", req.body);

    bc.hash(req.body.password).then((salted) => {
        console.log("salted: ", salted);
        db.register(req.body.first, req.body.last, req.body.email, salted)
            .then(({ rows }) => {
                console.log("rows in register!!!", rows[0].id);
                let userId = rows[0].id;
                req.session.userId = userId;
                console.log("req.session in register: ", req.ression);

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

app.listen(8080, function () {
    console.log("I'm here for you :)");
});
