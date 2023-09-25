const User = require("../models/user.model.js");
const Role = require("../models/role.model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../libs/jwt.js");

exports.register = async (req, res) => {
  const { email, password, username, roles } = req.body; //lee la petición

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      //crea objeto
      username,
      email,
      password: passwordHash,
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    const userSaved = await newUser.save(); //guarda en la base de datos
    const token = await generateJWT({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      roles: userSaved.roles,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body; //lee la petición

  try {
    //validar email

    const userFound = await User.findOne({ email }).populate("roles");
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    console.log(userFound);

    //validar contrasenia

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contrasenia incorrecta" });

    const token = await generateJWT({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

exports.profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) res.status(400).json({ message: "User not found" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "user not found" });
  return res.sendStatus(204);
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // busca el usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // si se proporciona una nueva contraseña, encripta y actualiza la contraseña
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;
    }

    // actualiza otros campos del usuario
    user.username = username || user.username;
    user.email = email || user.email;

    // guarda los cambios en el usuario
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
