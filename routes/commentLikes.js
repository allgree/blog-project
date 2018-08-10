const express = require('express');
const router = express.Router();

const CommentLikes = require('../requests/commentsLikesRequests');
const Users = require('../requests/usersRequests');



// добавить лайк к комментарию
router.post('/add/', (req, res, next) => {
   CommentLikes.add(req.body.comment_id, req.body.user_id, result_like => {
       let like = result_like.dataValues;
       Users.findUserByIdForLike(like.user_id, (result_user) => {
           like.user = result_user.dataValues;
           res.json(like);
       })
   })
});

// удалить лайк к посту
router.post('/delete/', (req, res, next) => {
   CommentLikes.delete(req.body.comment_id, req.body.user_id, result => {
       res.json({result: result,
                comment_id: req.body.comment_id,
                user_id: req.body.user_id});
   })
});

module.exports = router;