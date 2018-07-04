const express = require('express');

const router = express.Router();

const Posts = require('../models/postsRequests');
const PostsLikes = require('../models/posts_likesRequests');
const Comments = require('../models/commentsRequests');

//топ просмотренных записей
router.get('/top_views/', (req, res, next) => {
        Posts.findTopViewsPosts(result => {
            res.json(result)
        })
    }
);

router.get('/top_likes/', (req, res, next) => {
        let result = [];
        Posts.findTopLikesPosts(result_posts => {

            result_posts.forEach((item, i) => {

                result[i] = result_posts[i].dataValues;
                result[i].likes = {};

                PostsLikes.findPostLikes(item.id, result_likes => {
                    result[i].likes = result_likes;
                    (i === (result_posts.length - 1)) && (res.json(result));
                })
            });
        });
    }
);


// все посты
router.get('/', (req, res, next) => {
    Posts.findAll((result_posts) => {
        res.json(result_posts);
    })
});


//выборка постов для автоподгрузки
router.get('/sample/', (req, res, next) => {
    Posts.findSample(10, +req.query.offset, (result) => {
        res.json(result);
    });
});


// выборка постов пользователя для автоподгрузки
router.get('/sample/user/', (req, res, next) => {
    Posts.findByUserIdSample(10, +req.query.offset, +req.query.user_id, (result_posts) => {
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

//добавить просмотр
router.post('/addView/', (req, res, next) => {
    Posts.updateViews(req.body.post_id, req.body.views, (result) => {
        res.json(result);
    })
});

// добавить пост
router.post('/add/', (req, res, next) => {
   Posts.add(req.body.user_id, req.body.title, req.body.body, (result) => {
       res.json(result.dataValues);
   })
});

// удалить пост
router.post('/delete/', (req, res, next) => {
   Posts.delete(req.body.post_id, (result_delete_post) => {
           res.json(result_delete_post);
   })
});


module.exports = router;