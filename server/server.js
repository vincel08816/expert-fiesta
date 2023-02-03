const express = require("express");
const cors = require("cors");
const cp = require("cookie-parser");
const passport = require("passport");
const connectDB = require("./modules/db");

const next = require("next");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    // express stuff
    const app = express();

    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    app.use(cors());
    app.use(cp());
    app.use(passport.initialize());
    require("./modules/passport-config")(passport);

    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/user", require("./routes/user"));
    app.use("/api/message", require("./routes/message"));

    // nextjs here
    app.get("/", (req, res) => {
      nextApp.render(req, res, "/Home");
    });

    app.get("/login", (req, res) => {
      nextApp.render(req, res, "/Login");
    });

    app.get("/register", (req, res) => {
      nextApp.render(req, res, "/Register");
    });

    app.get("/admin", (req, res) => {
      nextApp.render(req, res, "/Admin");
    });

    app.get("/unverified", (req, res) => {
      nextApp.render(req, res, "/Unverified");
    });

    app.get("*", (req, res) => handle(req, res));

    app.listen(5000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:5000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

connectDB();
