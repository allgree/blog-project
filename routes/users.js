const express = require('express');
const router = express.Router();

const Users = require('../requests/usersRequests');


// выборка пользователей для автоподгрузки
router.get('/sample/', (req, res, next) => {
    let {offset, val_1, val_2} = req.query;
    Users.findSample(10, +offset, val_1, val_2).then(result => {
        res.json(result);
    });
});

// самый активный автор
router.get('/bloger/', (req, res, next) => {
    Users.findTopBloger().then(result => {
        res.json(result[0]);
    })
});

// самый активный комментатор
router.get('/commentator/', (req, res, next) => {
    Users.findTopCommentator().then(result => {
        res.json(result[0]);
    });
});

// один пользователь по id
router.get('/:user_id', (req, res, next) => {
    Users.findUserById(req.params.user_id).then(result => {
        res.json(result);
    });
});

module.exports = router;