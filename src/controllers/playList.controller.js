const PlayList = require("../models/playList.model");

/*
exports.renderPlaylist = async (req, res) => {
  try {
    const playListCollection = await PlayList.find().lean();
    if (req.isAuthenticated) {
      res.render("/dashboard", {
        playListCollection,
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

*/
exports.renderPlaylist = async (req, res) => {
  const playListCollection = await PlayList.find().lean();
  res.render("dashboard", { playListCollection });
};

exports.createPlayList = async (req, res, next) => {
  try {
    const playList = new PlayList(req.body);
    await playList.save();
    res.redirect("/admin-dashboard");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

exports.renderPlayListEdit = async (req, res, next) => {
  try {
    const playList = await PlayList.findById(req.params.id).lean();
    res.render("edit", { playList });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePlayList = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PlayList.updateOne({ _id: id }, req.body);
    res.redirect("/admin-dashboard");
  } catch (error) {
    console.log(error);
  }
};

exports.deletePlayList = async (req, res) => {
  try {
    const { id } = req.params;
    await PlayList.findByIdAndDelete(id);
    res.redirect("/admin-dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
