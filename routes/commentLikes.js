const express = require('express');
const router = express.Router();

const CommentLikes = require('../models/comments_likes');

router.get('/', (req, res, next) => {
   CommentLikes.findAll((result) => {
       res.json(result);
   })
});

router.post('/add/', (req, res, next) => {
   CommentLikes.add(req.body.comment_id, req.body.user_id, (result) => {
       res.json(result.dataValues);
   })
});

router.post('/delete/', (req, res, next) => {
   CommentLikes.delete(req.body.comment_id, req.body.user_id, (result) => {
       res.json(result);
   })
});

module.exports = router;