const express = require('express');
const router = express.Router();

const Subscriptons = require('../requests/subscriptionsRequests');

// выборка подписок пользователя для автоподгрузки
router.get('/sample/subs/', (req, res, next) => {
    let {offset, user_id, val_1, val_2} = req.query;
    Subscriptons.findSampleSubs(10, +offset, +user_id, val_1, val_2)
        .then(result => {
            res.json(result);
        });
});

// выборка подписчиков пользователя для автоподгрузки
router.get('/sample/followers/', (req, res, next) => {
    let {offset, sub_user_id, val_1, val_2} = req.query;
    Subscriptons.findSampleFollowers(10, +offset, +sub_user_id, val_1, val_2)
        .then(result => {
            res.json(result);
        })
});

// добавить подписку
router.post('/add/', (req, res, next) => {
    let {user_id, sub_user_id} = req.body;
    Subscriptons.findSub(user_id, sub_user_id).then(result_find => {
        return result_find.length
          ? false
          : Subscriptons.addSub(user_id, sub_user_id);
    }).then(result_add => {
        return result_add
          ? Subscriptons.findSubWithUsers(result_add.user_id, result_add.sub_user_id)
          : false;
    }).then(result_sub => {
        result_sub
          ? res.json(result_sub)
          : res.json(0);
    });
});

// удалить подписку
router.post('/delete/', (req, res, next) => {
    let {user_id, sub_user_id} = req.body;
    Subscriptons.deleteSub(user_id, sub_user_id).then(result => {
        res.json(result);
    })
});



module.exports = router;