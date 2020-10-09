/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    nama: { type: "string", required: true },
    username: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    photo: { type: "string", required: true },
  },
};
