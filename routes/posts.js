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
        Posts.findTopViewsPosts().then(result_posts => {
            result_posts.forEach((post, i) => {
                result[i] = post.dataValues;
                likes.push(PostsLikes.findPostLikes(post.id));
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


// топ отмеченных записей
router.get('/top_likes/', (req, res, next) => {
        let result = [];
        let likes = [];
        Posts.findTopLikesPosts().then(result_posts => {
            result_posts.forEach((post, i) => {
                result[i] = post.dataValues;
                likes.push(PostsLikes.findPostLikes(post.id));
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
    Posts.findSample(10, +req.query.offset, req.query.value).then(result_posts => {
        result_posts.forEach((post, i) => {
            result[i] = post.dataValues;
            likes.push(PostsLikes.findPostLikes(post.id));
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
    let {offset, user_id, value} = req.query;
    let result = [];
    let likes = [];
    Posts.findByUserIdSample(10, +offset, +user_id, value).then(result_posts => {
        result_posts.forEach((post, i) => {
            result[i] = post.dataValues;
            likes.push(PostsLikes.findPostLikes(post.id));
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


// выборка постов в ленте пользователя для автоподгрузки
router.get('/feed/', (req, res, next) => {
    let {user_id, offset, value} = req.query;
    let result = [];
    let likes = [];
    Subscriptions.findSubs(+user_id)
        .then(result_subs => {
            let arr_sub_users = result_subs.map((sub) => {
                return sub.sub_user_id;
            });
            return Posts.findPostsByFeed(10, +offset, arr_sub_users, value);
    }).then(result_posts => {
        result_posts.forEach((post, i) => {
            result[i] = result_posts[i].dataValues;
            likes.push(PostsLikes.findPostLikes(post.id))
        });
        Promise.all(likes).then(resultMessage => {
            result.forEach((item, i) => {
                result[i].likes = resultMessage[i];
            });
            res.json(result);
        }, errMessage => {
            console.log(errMessage);
        })
    });
});

// один пост по id
router.get('/:post_id', (req, res, next) => {
    let post;
    Posts.findById(req.params.post_id).then(resultPost => {
        resultPost.dataValues.views++;
        post = resultPost;
        return Posts.updateViews(resultPost.dataValues.id, resultPost.dataValues.views)
    }).then(() => {
        res.json(post);
    });
});


// добавить пост
router.post('/add/', (req, res, next) => {
    let {user_id, title, body} = req.body;
    let post; //TODO проверка авторизации
    Posts.add(user_id, title, body).then(result_post => {
        post = result_post.dataValues;
        return Users.findUserByIdForNewItem(user_id)
    }).then(result_user => {
        post.author = result_user.dataValues;
        post.likes = [];
        res.json(post);
    });
});

// удалить пост
router.post('/delete/', (req, res, next) => {
    //TODO проверка авторизации и авторства удаляемого поста
    Posts.delete(req.body.post_id).then(result_delete_post => {
        res.json(result_delete_post);
    });
});


module.exports = router;