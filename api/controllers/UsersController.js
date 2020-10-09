/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

module.exports = {
  index: async (req, res) => {
    const params = req.params.id;
    if (!params) {
      const data = await Users.find();
      return res.view("pages/users", { data_user: data });
    } else {
      const data = await Users.find({ id: params });
      if (data.length === 0) {
        return res.view("404");
      }
      return res.view("pages/users", { data_user: data });
    }
  },

  add_form: async (req, res) => {
    return res.view("pages/add_user");
  },

  add: async (req, res) => {
    try {
      const data = req.body;
      const create_user = await Users.create({
        nama: data.nama,
        username: data.username,
        password: data.password,
        photo: "user_profile_default.png",
      });
      return res.redirect("/users/");
    } catch (error) {
      console.log(error);
      return res.serverError("error");
    }
  },

  edit_form: async (req, res) => {
    const params = req.params.id;
    if (!params) {
      return res.redirect("/users/");
    }
    // get user
    const user = await Users.findOne({ id: params });
    if (user === undefined) {
      return res.redirect("/users/");
    }
    return res.view("pages/edit_user", { data_user: user });
  },

  edit: async (req, res) => {
    const params = req.params.id;
    const data = req.body;
    if (!params) {
      return res.redirect("/users/");
    }
    // get user
    const user = await Users.findOne({ id: params });
    if (user === undefined) {
      return res.redirect("/users/");
    }
    // edit user
    try {
      const edit_user = await Users.update(
        { id: params },
        {
          nama: data.nama,
          username: data.username,
          password: data.password,
        }
      );
      return res.redirect("/users/");
    } catch (error) {
      console.log(error);
      return res.serverError("Error");
    }
  },

  delete: async (req, res) => {
    const params = req.params.id;
    if (!params) {
      return res.redirect("/users/");
    }
    // cek_user
    const cek_user = await Users.findOne({ id: params });
    if (cek_user === undefined) {
      return res.redirect("/users/");
    }
    // remove user
    const remove_user = await Users.destroy({ id: params });
    return res.redirect("/users");
  },

  profile: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    // get users data
    const data_user = await Users.findOne({ id: req.session.id_user });
    return res.view("pages/profile", { data_user: data_user });
  },

  set_profile: async (req, res) => {
    // cek apakah sudah login
    const FILEDIR = "../../assets/images/";
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }

    // get user
    const user = await Users.findOne({ id: req.session.id_user });
    if (!(user.photo === "user_profile_default.png")) {
      fs.unlinkSync(
        path.join(__dirname, "../", "../", "assets", "images", user.photo)
      );
    }

    const ext = req.file("photo")._files[0].stream.filename.split(".")[1];
    const filename = `${crypto.randomBytes(20).toString("hex")}.${ext}`;
    // update user photo
    const update_user = await Users.update(
      { id: req.session.id_user },
      { photo: filename }
    );
    const upload_file = await req.file("photo").upload(
      {
        dirname: process.cwd() + "/assets/images",
        saveAs: filename,
        maxBytes: 10000000,
      },
      (err, uploadedFiles) => {
        if (err) return res.serverError(err);
      }
    );
    return res.redirect("/profile/");
  },

  remove_photo_profile: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    // get user
    const user = await Users.findOne({ id: req.session.id_user });
    if (!(user.photo === "user_profile_default.png")) {
      const update_user = await Users.update(
        { id: req.session.id_user },
        { photo: "user_profile_default.png" }
      );
      fs.unlinkSync(
        path.join(__dirname, "../", "../", "assets", "images", user.photo)
      );
      return res.redirect("/profile/");
    } else {
      return res.redirect("/profile/");
    }
  },
};
