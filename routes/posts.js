const express = require('express');

const router = express.Router();

const Posts = require('../models/posts');
const PostsLikes = require('../models/posts_likes');

// все посты
router.get('/', (req, res, next) => {
    Posts.findAll((result_posts) => {
        res.json(result_posts);
    })
});


//выборка пяти постов для автоподгрузки
router.get('/sample/', (req, res, next) => {
    Posts.findSample(5, +req.query.offset, (result) => {
        res.json(result);
    });
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
        resultPost.dataValues.views++;
        Posts.updateViews(resultPost.dataValues.id, resultPost.dataValues.views, (resultUpdate) => {
            res.json(resultPost);
        });
    })
});

router.post('/addView/', (req, res, next) => {
    Posts.updateViews(req.body.post_id, req.body.views, (result) => {
        res.json(result);
    })
});

router.post('/add/', (req, res, next) => {
   Posts.add(req.body.user_id, req.body.title, req.body.body, (result) => {
       res.json(result.dataValues);
   })
});

router.post('/delete/', (req, res, next) => {
   Posts.delete(req.body.post_id, (result) => {
       res.json(result);
   })
});


module.exports = router;