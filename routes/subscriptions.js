const express = require('express');
const router = express.Router();

const Subscriptons = require('../models/subscriptions');

router.get('/sample/subs/', (req, res, next) => {
    Subscriptons.findSampleSubs(10, +req.query.offset, +req.query.user_id, (result) => {
        res.json(result);
    })
});

router.post('/add/', (req, res, next) => {
    Subscriptons.findSub(req.body.user_id, req.body.sub_user_id, (result_find) => {
        result_find.length
            ? res.json(0)
            : Subscriptons.addSub(req.body.user_id, req.body.sub_user_id, (result) => {
                res.json(result);
            })
    })

});

router.post('/delete/', (req, res, next) => {
    console.log('!!!  ROUTER !!!');
   Subscriptons.deleteSub(req.body.user_id, req.body.sub_user_id, (result) => {
       res.json(result);
   })
});

router.get('/sample/subscribes/', (req, res, next) => {
    Subscriptons.findSampleSubscribes(10, +req.query.offset, +req.query.sub_user_id, (result) => {
        res.json(result);
    })
});

module.exports = router;