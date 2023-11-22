const express = require("express");
const { create } = require("express-handlebars");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes.js");
const { createRoles } = require("./libs/initialSetup.js");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

createRoles();

app.use(express.json());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(authRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "assets")));

module.exports = app;
