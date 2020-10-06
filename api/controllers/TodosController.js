/**
 * TodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    // get all data
    const data = await Todos.find({ id_user: req.session.id_user }).sort([
      { createdAt: "DESC" },
    ]);
    return res.view("pages/todo", { data_todo: data });
  },

  add_form: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    return res.view("pages/add_todo");
  },

  create: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    const data = req.body;
    try {
      const create_todo = await Todos.create({
        id_user: req.session.id_user,
        todo: data.todo,
        complete: false,
      });
      return res.redirect("/todos/");
    } catch (error) {
      console.log(error);
      return res.serverError("error");
    }
  },

  edit_form: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    // get id todo from url
    const params = req.params.id;
    if (!params) {
      return res.redirect("/todos/");
    }
    // get todo
    const todo = await Todos.findOne({ id: params });
    // check if todo exists
    if (todo === undefined) {
      return res.redirect("/todos");
    }
    return res.view("pages/edit_todo", { data_todo: todo });
  },

  update: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    // get id todo from url
    const params = req.params.id;
    if (!params) {
      return res.redirect("/todos/");
    }
    // get todo
    const todo = await Todos.findOne({ id: params });
    // check if todo exists
    if (todo === undefined) {
      return res.redirect("/todos");
    }
    // get form data
    const data = req.body;

    // update todo
    const update_todo = await Todos.update({ id: params }, { todo: data.todo });
    return res.redirect("/todos/");
  },

  complete: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    // get id todo from url
    const params = req.params.id;
    if (!params) {
      return res.redirect("/todos/");
    }
    // get todo
    const todo = await Todos.findOne({ id: params });
    // check if todo exists
    if (todo === undefined) {
      return res.redirect("/todos");
    }
    // set complete
    const mark_todo = await Todos.update({ id: params }, { complete: true });
    return res.redirect("/todos/");
  },

  remove: async (req, res) => {
    if (!req.session.loggedin) {
      return res.redirect("/login/");
    }
    // get id todo from url
    const params = req.params.id;
    if (!params) {
      return res.redirect("/todos/");
    }
    // get todo
    const todo = await Todos.findOne({ id: params });
    // check if todo exists
    if (todo === undefined) {
      return res.redirect("/todos");
    }
    // set remove todo
    const remove_todo = await Todos.destroy({ id: params });
    return res.redirect("/todos/");
  },
};
