const { Router } = require("express");
const authCtrl = require("../controllers/auth.controller.js");
const { authRequired, isAdmin } = require("../middlewares/validateToken.js");
const {
  renderPlaylist,
  createPlayList,
  renderPlayListEdit,
  updatePlayList,
  deletePlayList,
} = require("../controllers/playList.controller.js");
const path = require("path");
const PlayList = require("../models/playList.model");

const router = Router();

// Rutas

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "layouts", "login.html");
  res.sendFile(filePath);
});

router.get("/register", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "views",
    "layouts",
    "register.html"
  );
  res.sendFile(filePath);
});

//router.get("/dashboard", renderPlaylist);
router.get("/dashboard", async (req, res) => {
  const playListCollection = await PlayList.find().lean();
  const isAdmin = false;

  res.render("dashboard", { playListCollection, isAdmin });
});
/*
router.get("/admin-dashboard", async (req, res) => {
  const playListCollection = await PlayList.find().lean();
  res.render("dashboard", { playListCollection, isAdmin: true });
});*/

router.get("/admin-dashboard", authRequired, isAdmin, async (req, res) => {
  const playListCollection = await PlayList.find().lean();
  res.render("dashboard", { playListCollection, isAdmin: true });
});

router.post("/playlist/add", createPlayList);

router.get("/update/:id", renderPlayListEdit);

router.post("/update/:id", updatePlayList);

router.get("/delete/:id", deletePlayList);

//User

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.post("/logout", authCtrl.logout);
router.delete("/profile/:id", [authRequired, isAdmin], authCtrl.deleteUser);
router.put("/profile/:id", [authRequired, isAdmin], authCtrl.updateUser);

module.exports = router;
