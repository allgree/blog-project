const express = require('express');
const router = express.Router();

const PostLikes = require('../requests/postsLikesRequests');
const Users = require('../requests/usersRequests');

// добавить лайк к посту
router.post('/add/', (req, res, next) => {
    PostLikes.add(req.body.post_id, req.body.user_id, (result_like) => {
        let like = result_like.dataValues;
        Users.findUserByIdForLike(like.user_id, (result_user) => {
            like.user = result_user.dataValues;
            res.json(like);
        });
    });
});

// удалить лайк к посту
router.post('/delete/', (req, res, next) => {
    PostLikes.delete(req.body.post_id, req.body.user_id, (result) => {
        res.json({result: result,
                  post_id: req.body.post_id,
                  user_id: req.body.user_id});
    })
});

module.exports = router;