const jwt = require("jsonwebtoken");
const dtenv = require("dotenv").config();
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");

const SECRET_KEY = process.env.SECRET_KEY;
exports.authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  const error = "No token provided";
  if (!token) return res.status(401).render("error", { error });

  const decoded = jwt.verify(token, SECRET_KEY);
  req.userId = decoded.id;

  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json({ message: "No user found" });

  next();
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  console.log(user);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "admin") {
      next();
      return;
    }
  }
  const error = "Admin required";
  return res.status(403).render("error", { error });
};
