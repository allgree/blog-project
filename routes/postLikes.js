const express = require('express');
const router = express.Router();

const PostLikes = require('../models/posts_likes');

router.get('/', (req, res, next) => {
    PostLikes.findAll((result) => {
        res.json(result);
    })
});

module.exports = router;