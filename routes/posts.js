const express = require('express');

const router = express.Router();

const Posts = require('../requests/postsRequests');
const PostsLikes = require('../requests/postsLikesRequests');
const Users = require('../requests/usersRequests');
const Subscriptions = require('../requests/subscriptionsRequests');


// топ просмотренных записей
router.get('/top_views/', (req, res, next) => {
        let result = [];
        let likes = [];
        Posts.findTopViewsPosts(result_posts => {
            result_posts.forEach((post, i) => {
                result[i] = post.dataValues;
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
                result[i] = post.dataValues;
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
            result[i] = post.dataValues;
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


// выборка постов пользователя для автоподгрузки
router.get('/user-posts-sample/', (req, res, next) => {
    let result = [];
    let likes = [];
    Posts.findByUserIdSample(10, +req.query.offset, +req.query.user_id, (result_posts) => {
        result_posts.forEach((post, i) => {
            result[i] = post.dataValues;
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


// выборка постов в ленте пользователя
router.get('/feed/', (req, res, next) => {
    let result = [];
    let likes = [];
    Subscriptions.findSubs(+req.query.user_id, (result_subs) => {
        let arr_sub_users = result_subs.map((sub) => {
            return sub.sub_user_id;
        });
        Posts.findPostsByFeed(5, +req.query.offset, arr_sub_users, (result_posts) => {
            result_posts.forEach((post, i) => {
                result[i] = result_posts[i].dataValues;
                likes.push(new Promise((resolve, reject) => {
                    PostsLikes.findPostLikes(post.id, result_likes => {
                        resolve(result_likes);
                    })
                }))
            });
            Promise.all(likes).then(resultMessage => {
                result.forEach((item, i) => {
                    result[i].likes = resultMessage[i];
                });
                res.json(result);
            }, errMessage => {
                console.log(errMessage);
            })
        })
    });

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


// добавить пост
router.post('/add/', (req, res, next) => {
   Posts.add(req.body.user_id, req.body.title, req.body.body, (result_post) => {
       let post = result_post.dataValues;
       Users.findUserByIdForNewItem(req.body.user_id, (result_user) => {
           post.author = result_user.dataValues;
           post.likes = [];
           res.json(post);
       });
   })
});

// удалить пост
router.post('/delete/', (req, res, next) => {
   Posts.delete(req.body.post_id, (result_delete_post) => {
           res.json(result_delete_post);
   })
});


module.exports = router;