/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const TodosController = require("../api/controllers/TodosController");
const Todos = require("../api/models/Todos");
const AuthController = require("../api/controllers/AuthController");

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  // Users Route
  "get /users/": "UsersController.index",
  "get /users/:id": "UsersController.index",
  "get /users/add": "UsersController.add_form",
  "post /users/add": "UsersController.add",
  "get /users/edit/:id": "UsersController.edit_form",
  "post /users/edit/:id": "UsersController.edit",
  "get /users/remove/:id": "UsersController.delete",

  // auth
  "get /login/": "AuthController.login_form",
  "post /login/": "AuthController.login",
  "get /signup/": "AuthController.signup",
  "get /logout/": "AuthController.logout",

  // Todos Route
  "get /todos/": "TodosController.index",
  "get /todos/add": "TodosController.add_form",
  "post /todos/add": "TodosController.create",
  "get /todos/edit/:id": "TodosController.edit_form",
  "post /todos/edit/:id": "TodosController.update",
  "get /todos/mark/:id": "TodosController.complete",
  "get /todos/remove/:id": "TodosController.remove",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
