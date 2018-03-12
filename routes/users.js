const express = require('express');

const router = express.Router();

const Users = require('../models/users');

// все пользователи
router.get('/', (req, res, next) => {
   Users.findAll((result) => {
       res.json(result);
   })
});

// один пользователь по id
router.get('/:user_id', (req, res, next) => {
   Users.findById(req.params.user_id, (result) => {
       res.json(result);
   })
});

module.exports = router;