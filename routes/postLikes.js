const express = require('express');
const router = express.Router();

const PostLikes = require('../models/posts_likesRequests');
const Users = require('../models/usersRequests');

router.get('/', (req, res, next) => {
    PostLikes.findAll((result) => {
        res.json(result);
    })
});

router.post('/add/', (req, res, next) => {
    PostLikes.add(req.body.post_id, req.body.user_id, (result_like) => {
        let like = result_like.dataValues;
        like.user = {};
        Users.findById(like.user_id, (result_user) => {
            like.user = result_user.dataValues;
            console.log(like);
            res.json(like);
        });
       //res.json(result.dataValues);
    });
});

router.post('/delete/', (req, res, next) => {
    PostLikes.delete(req.body.post_id, req.body.user_id, (result) => {
        res.json({result: result,
                  post_id: req.body.post_id,
                  user_id: req.body.user_id});
    })
});

module.exports = router;