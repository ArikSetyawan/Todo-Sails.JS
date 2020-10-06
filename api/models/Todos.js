/**
 * Todos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id_user: { type: "string", required: true },
    todo: { type: "string", required: true },
    complete: { type: "boolean", required: true },
  },
};
