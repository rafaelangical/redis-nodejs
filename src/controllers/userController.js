'use strict';

const userRepository = require('../repositories/userRepository');

const redis = require('redis');
const client = redis.createClient();

exports.get = (req, res, next) => {
  client.get('allusers', (err, reply) => {
    if (reply) {
      console.log('redis');
      res.send(reply)
    } else {
      console.log('db');

      userRepository.getAll()
        .then((user) => {
          client.set('allusers', JSON.stringify(user));
          client.expire('allusers', 20);
          res.status(200).send(user);
        }).catch(err => res.status(500).send(err))
    }
  });
};

exports.getById = (req, res, next) => {

  userRepository.getById(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    }).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
  const p = req.body;

  userRepository.create(p)
    .then((user) => {
      res.status(200).send(user);
    }).catch(err => res.status(500).send(err))
};

exports.put = (req, res, next) => {
  const p = req.body;

  userRepository.update(req.params.id, p)
    .then((user) => {
      res.status(201).send(user);
    }).catch(err => res.status(500).send(err))
};

exports.delete = (req, res, next) => {
  userRepository.delete(req.params.id)
    .then((user) => {
      res.status(200).send('delete succeeded!');
    }).catch(err => console.error.bind(console, `Error ${err}`))
};