const express = require('express');

const router = express.Router();

const Posts = require('../models/postsRequests');
const PostsLikes = require('../models/posts_likesRequests');


// топ просмотренных записей
router.get('/top_views/', (req, res, next) => {
        let result = [];
        let likes = [];
        Posts.findTopViewsPosts(result_posts => {
            result_posts.forEach((post, i) => {
                result[i] = result_posts[i].dataValues;
                likes.push(new Promise((resolve, reject) => {
                    PostsLikes.findPostLikes(post.id, result_likes => {
                        resolve(result_likes);
                    })
                }));
            });
            Promise.all(likes).then(resultMessage => {
                result.forEach((item, i) => {
                    result[i].likes = resultMessage[i];
                });
                res.json(result);
            }, errMessage => {
                console.log(errMessage);
            });
        })
    }
);

// топ отмеченных записей
router.get('/top_likes/', (req, res, next) => {
        let result = [];
    let likes = [];
        Posts.findTopLikesPosts(result_posts => {
            result_posts.forEach((post, i) => {
                result[i] = result_posts[i].dataValues;
                likes.push(new Promise((resolve, reject) => {
                    PostsLikes.findPostLikes(post.id, result_likes => {
                        resolve(result_likes);
                    })
                }));
            });
            Promise.all(likes).then(resultMessage => {
                result.forEach((item, i) => {
                    result[i].likes = resultMessage[i];
                });
                res.json(result);
            }, errMessage => {
                console.log(errMessage);
            });
        });
    }
);


//выборка постов для автоподгрузки
router.get('/sample/', (req, res, next) => {
    let result = [];
    let likes = [];
    Posts.findSample(10, +req.query.offset, (result_posts) => {
        result_posts.forEach((post, i) => {
            result[i] = result_posts[i].dataValues;
            likes.push(new Promise((resolve, reject) => {
                PostsLikes.findPostLikes(post.id, result_likes => {
                    resolve(result_likes);
                })
            }));
        });
        Promise.all(likes).then(resultMessage => {
            result.forEach((item, i) => {
                result[i].likes = resultMessage[i];
            });
            res.json(result);
        }, errMessage => {
            console.log(errMessage);
        });
    });
});


// все посты
router.get('/', (req, res, next) => {
    Posts.findAll((result_posts) => {
        res.json(result_posts);
    })
});





// выборка постов пользователя для автоподгрузки
router.get('/user-posts-sample/', (req, res, next) => {
    let result = [];
    let likes = [];
    Posts.findByUserIdSample(10, +req.query.offset, +req.query.user_id, (result_posts) => {
        result_posts.forEach((post, i) => {
            result[i] = result_posts[i].dataValues;
            likes.push(new Promise((resolve, reject) => {
                PostsLikes.findPostLikes(post.id, result_likes => {
                    resolve(result_likes);
                })
            }));
        });
        Promise.all(likes).then(resultMessage => {
            result.forEach((item, i) => {
                result[i].likes = resultMessage[i];
            });
            res.json(result);
        }, errMessage => {
            console.log(errMessage);
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