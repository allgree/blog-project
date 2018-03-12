const express = require('express');

const router = express.Router();

const Posts = require('../models/posts');
const PostsLikes = require('../models/posts_likes');


// топ 5 популярных постов
router.get('/top', (req, res, next) => {
    Posts.findAll((result_posts) => {
        PostsLikes.findAll((result_posts_likes) => {
            let posts_obj = result_posts;
            let posts_likes_obj = result_posts_likes;
            for (let i = 0; i < posts_obj.length; i++) {
                posts_obj[i].dataValues.likes = 0;
                for (let j = 0; j < posts_likes_obj.length; j++) {
                    if (posts_obj[i].id === posts_likes_obj[j].post_id) {
                        posts_obj[i].dataValues.likes++;
                    }
                }
            }
            posts_obj.sort((a, b) => {
               return b.dataValues.likes - a.dataValues.likes;
            });
            let res_array = posts_obj.slice(0, 5);
            res.json(res_array);
        });

    })
});

module.exports = router;