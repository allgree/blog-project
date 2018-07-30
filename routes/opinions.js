const express = require('express');

const router = express.Router();

const Opinions = require('../requests/opinionsRequests');

//router.get('/all/', (req, res, next) => {
//    Opinions.findAll((result_opinions) => {
//        res.json(result_opinions);
//    })
//});


router.get('/sample/', (req, res, next) => {
    Opinions.findSample(10, +req.query.offset, (result_opinions) => {
        res.json(result_opinions);
    })
});

module.exports = router;