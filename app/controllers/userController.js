const { User } = require("../models");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const userController = {
  signupPage: (req, res) => {
    res.render("signup");
  },
  signup: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        return res.render("signup", { error: "Cet email est déjà utilisé" });
      }
      
      if (!emailValidator.validate(req.body.email)) {
        return res.render("signup", { error: "Cet email n'est pas valide" });
      }

      if (req.body.password !== req.body.passwordConfirm) {
        return res.render("signup", {
          error: "Les mots de passe ne correspondent pas",
        });
      }
      
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });
      newUser.save().then(() => {
        res.redirect("/login");
      });
    });
  },
  loginPage: (req, res) => {
    res.render("login");
  },
  login: (req, res) => {
    
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res.render("login", {
          error: "Aucun utilisateur ne correspond à cet email",
        });
      }
      
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.render("login", { error: "Mot de passe incorrect" });
      }

      req.session.user = user;

      
      delete req.session.user.password;
      res.redirect("/");
    });
  },
  profilePage: (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    res.render("profile");
  },
  disconnect: (req, res) => {
    req.session.user = false;
    res.redirect("/");
  },
};

module.exports = userController;
