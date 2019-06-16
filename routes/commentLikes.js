const express = require('express');
const router = express.Router();

const CommentLikes = require('../requests/commentsLikesRequests');
const Users = require('../requests/usersRequests');



// добавить лайк к комментарию
router.post('/add/', (req, res, next) => {
    let {comment_id, user_id} = req.body;
    let like;
    CommentLikes.add(comment_id, user_id).then(result_like => {
        like = result_like.dataValues;
        return Users.findUserByIdForLike(like.user_id)
    }).then(result_user => {
        like.user = result_user.dataValues;
        res.json(like);
    });
});

// удалить лайк к комментарию
router.post('/delete/', (req, res, next) => {
    let {comment_id, user_id} = req.body;
    CommentLikes.delete(comment_id, user_id).then(result => {
        res.json({result, comment_id, user_id});
    });
});

module.exports = router;