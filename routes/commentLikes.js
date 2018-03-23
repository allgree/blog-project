const express = require('express');
const router = express.Router();

const CommentLikes = require('../models/comments_likes');

router.get('/', (req, res, next) => {
   CommentLikes.findAll((result) => {
       res.json(result);
   })
});

module.exports = router;