require("dotenv").config();

const path = require("path");
const express = require("express");
const router = require("./app/routers");
const session = require("express-session");
const userMiddleware = require("./app/middlewares/user");

const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static(path.join(__dirname, "./assets")));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "Un très joli secret dans une boite au fond d'un puit",
  })
);

app.use(userMiddleware);

app.use(router);

app.listen(port, (_) => {
  console.log(`http://localhost:${port}`);
});
