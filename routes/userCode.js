const e = require('express');
const mongoose = require('mongoose');

const userSchema = require('../models/Users');

module.exports = (app) => {
  app.post('/', async (req, res) => {
    console.log(req.body);
  });
};
