module.exports = {
  login_form: async (req, res) => {
    if (req.session.loggedin) {
      return res.redirect("/");
    }
    return res.view("pages/login");
  },

  login: async (req, res) => {
    if (req.session.loggedin) {
      return res.redirect("/");
    }
    const data = req.body;
    if (!data.username || !data.password) {
      return res.redirect("/login/");
    }
    // cek user
    const cek_user = await Users.findOne({
      username: data.username,
      password: data.password,
    });
    if (cek_user === undefined) {
      return res.redirect("/login/");
    }
    req.session.loggedin = true;
    req.session.id_user = cek_user.id;
    return res.redirect("/");
  },

  logout: async (req, res) => {
    const destroy_session = await req.session.destroy();
    return res.redirect("/");
  },

  signup: async (req, res) => {
    if (req.session.loggedin) {
      return res.redirect("/");
    }
    return res.view("pages/add_user");
  },
};
