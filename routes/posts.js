const express = require('express');

const router = express.Router();

const Posts = require('../models/posts');

// все посты
router.get('/', (req, res, next) => {
    Posts.findAll((result_posts) => {
        res.json(result_posts);
    })
});


//выборка постов для автоподгрузки
router.get('/sample/', (req, res, next) => {
    Posts.findSample(6, +req.query.offset, (result) => {
        res.json(result);
    });
});


// выборка постов пользователя для автоподгрузки
router.get('/sample/user/', (req, res, next) => {
    Posts.findByUserIdSample(3, +req.query.offset, +req.query.user_id, (result_posts) => {
        res.json(result_posts);
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