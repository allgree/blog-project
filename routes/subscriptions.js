const express = require('express');
const router = express.Router();

const Subscriptons = require('../requests/subscriptionsRequests');

// выборка подписок пользователя для автоподгрузки
router.get('/sample/subs/', (req, res, next) => {
    Subscriptons.findSampleSubs(10,
                                +req.query.offset,
                                +req.query.user_id,
                                req.query.val_1,
                                req.query.val_2,
                                result => {
                                    res.json(result);
                                })
});

// выборка подписчиков пользователя для автоподгрузки
router.get('/sample/followers/', (req, res, next) => {
    Subscriptons.findSampleFollowers(10,
                                     +req.query.offset,
                                     +req.query.sub_user_id,
                                     req.query.val_1,
                                     req.query.val_2,
                                     result => {
                                         res.json(result);
                                     })
});

// добавить подписку
router.post('/add/', (req, res, next) => {
    Subscriptons.findSub(req.body.user_id, req.body.sub_user_id, result_find => {
        result_find.length
            ? res.json(0)
            : Subscriptons.addSub(req.body.user_id, req.body.sub_user_id, result_add => {
                Subscriptons.findSubWithUsers(result_add.user_id, result_add.sub_user_id, result_sub => {
                    res.json(result_sub);
                });
            })
    })
});

// удалить подписку
router.post('/delete/', (req, res, next) => {
   Subscriptons.deleteSub(req.body.user_id, req.body.sub_user_id, result => {
       res.json(result);
   })
});



module.exports = router;