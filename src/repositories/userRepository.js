'use strict';
var User = require('../config/db');

module.exports = new class PersonRepository {

  getAll() {
    return User.find();
  }

  getById(id) {
    return User.findById(id);
  }

  create(data) {
    return User.create(data);
  }

  update(id, user) {

    const updateduser = {
      name: user.name,
      mail: user.mail,
    }

    return User.findByIdAndUpdate(id, updateduser, { new: true });
  }

  delete(id) {
    return User.findByIdAndRemove(id);
  }

}