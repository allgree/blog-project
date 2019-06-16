const express = require('express');

const router = express.Router();

const Opinions = require('../requests/opinionsRequests');
const Users = require('../requests/usersRequests');


// выборка отзывов для автоподгрузки
router.get('/sample/', (req, res, next) => {
    Opinions.findSample(10, +req.query.offset).then(result_opinions => {
        res.json(result_opinions);
    });
});

// добавить отзыв
router.post('/add/', (req, res, next) => {
    let {name, user_id, body} = req.body;
    let opinion;
    Opinions.add(name, user_id, body).then(result_opinion => {
        opinion = result_opinion.dataValues;
        return user_id
            ? Users.findUserByIdForLike(user_id)
            : false
    }).then(result_user => {
        if (result_user) {
            opinion.author = result_user.dataValues;
        }
        res.json(opinion);
    });
});

module.exports = router;