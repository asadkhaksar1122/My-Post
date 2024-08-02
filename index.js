const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const Homeroutes = require("./routes/home.js");
const Userroutes = require("./routes/user.js");
const { Note } = require("./schema/notes.js");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const session = require("express-session");
const { Pageerror } = require("./middleware/error.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const { user } = require("./schema/user.js");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Notes");
}

main().catch((err) => console.log(err));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: "nothing else",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
// Inside your Passport configuration

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentuser = req.user;
  next();
})
app.use("/", Homeroutes);
app.use("/", Userroutes);

app.all("*", (req, res, next) => {
  next(new Pageerror(404, "Page not found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Internel server error" } = err;
  res.status(statusCode).send(message);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
