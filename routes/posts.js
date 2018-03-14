const express = require('express');

const router = express.Router();

const Posts = require('../models/posts');
const PostsLikes = require('../models/posts_likes');

// все посты
router.get('/', (req, res, next) => {
    Posts.findAll((result_posts) => {
        PostsLikes.findAll((result_posts_likes) => {
            for (let i = 0; i < result_posts.length; i++) {
                result_posts[i].dataValues.likes = 0;
                for (let j = 0; j < result_posts_likes.length; j++) {
                    if (result_posts[i].id === result_posts_likes[j].post_id) {
                        result_posts[i].dataValues.likes++;
                    }
                }
            }
            res.json(result_posts);
        });
    })
});


// топ 5 отмеченных постов
router.get('/top-likes', (req, res, next) => {
    Posts.findAll((result_posts) => {
        PostsLikes.findAll((result_posts_likes) => {
            for (let i = 0; i < result_posts.length; i++) {
                result_posts[i].dataValues.likes = 0;
                for (let j = 0; j < result_posts_likes.length; j++) {
                    if (result_posts[i].id === result_posts_likes[j].post_id) {
                        result_posts[i].dataValues.likes++;
                    }
                }
            }
            result_posts.sort((a, b) => {
               return b.dataValues.likes - a.dataValues.likes;
            });
            let res_array = result_posts.slice(0, 5);
            res.json(res_array);
        });
    });
});


// топ 5 просмотренных постов
router.get('/top-views', (req, res, next) => {
    Posts.findAll((result_posts) => {
        result_posts.sort((a, b) => {
            return b.dataValues.views - a.dataValues.views;
        });
        let res_array = result_posts.slice(0, 5);
        res.json(res_array);
    })
});

// все посты по id пользователя
router.get('/user/:user_id', (req, res, next) => {
    Posts.findByUserId(req.params.user_id, (result_posts) => {
        PostsLikes.findAll((result_posts_likes) => {
            for (let i = 0; i < result_posts.length; i++) {
                result_posts[i].dataValues.likes = 0;
                for (let j = 0; j < result_posts_likes.length; j++) {
                    if (result_posts[i].id === result_posts_likes[j].post_id) {
                        result_posts[i].dataValues.likes++;
                    }
                }
            }
            res.json(result_posts);
        });
    })
});

// один пост по id
router.get('/:post_id', (req, res, next) => {
    Posts.findById(req.params.post_id, (resultPost) => {
        PostsLikes.findByPostId(req.params.post_id, (resultLikes) => {
            resultPost.dataValues.likes = resultLikes.length;
            res.json(resultPost);
        });
    })
});




module.exports = router;