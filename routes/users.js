const express = require('express');
const router = express.Router();

const Users = require('../requests/usersRequests');


// выборка пользователей для автоподгрузки
router.get('/sample/', (req, res, next) => {
   Users.findSample(10, +req.query.offset, req.query.val_1, req.query.val_2, result => {
       res.json(result);
   })
});

// самый активный блогер
router.get('/bloger/', (req, res, next) => {
   Users.findTopBloger(result => {
       res.json(result[0]);
   })
});

// самый активный комментатор
router.get('/commentator/', (req, res, next) => {
    Users.findTopCommentator(result => {
        res.json(result[0]);
    })
});

// один пользователь по id
router.get('/:user_id', (req, res, next) => {
   Users.findUserById(req.params.user_id, result => {
       res.json(result);
   })
});

module.exports = router;