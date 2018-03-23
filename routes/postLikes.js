const express = require('express');
const router = express.Router();

const PostLikes = require('../models/posts_likes');

router.get('/', (req, res, next) => {
    PostLikes.findAll((result) => {
        res.json(result);
    })
});

router.post('/add/', (req, res, next) => {
    PostLikes.add(req.body.post_id, req.body.user_id, (result) => {
       res.json(result.dataValues);
    });
});

router.post('/delete/', (req, res, next) => {
    PostLikes.delete(req.body.post_id, req.body.user_id, (result) => {
        res.json(result);
    })
});

module.exports = router;