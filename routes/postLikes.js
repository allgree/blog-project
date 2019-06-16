const express = require('express');
const router = express.Router();

const PostLikes = require('../requests/postsLikesRequests');
const Users = require('../requests/usersRequests');

// добавить лайк к посту
router.post('/add/', (req, res, next) => {
    let {post_id, user_id} = req.body;
    let like;
    PostLikes.add(post_id, user_id).then(result_like => {
        like = result_like.dataValues;
        return Users.findUserByIdForLike(like.user_id);
    }).then(result_user => {
        like.user = result_user.dataValues;
        res.json(like);
    });
});

// удалить лайк к посту
router.post('/delete/', (req, res, next) => {
    let {post_id, user_id} = req.body;
    PostLikes.delete(post_id, user_id).then(result => {
        res.json({result, post_id, user_id});
    });
});

module.exports = router;