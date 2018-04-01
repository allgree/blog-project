const express = require('express');
const router = express.Router();

const Users = require('../models/users');
const Posts = require('../models/posts');
const Comments = require('../models/comments');
const PostLikes = require('../models/posts_likes');
const CommentLikes = require('../models/comments_likes');

// все пользователи
router.get('/', (req, res, next) => {
   Users.findAll((result) => {
       let modified_users = result.map((user, index) => {
            delete user.dataValues.password;
            delete user.dataValues.login;
            return user;
       });
       res.json(modified_users);
   })
});

// самый активный блогер
router.get('/bloger', (req, res, next) => {
    Users.findAll((result_users) => {
        Posts.findAll((result_posts) => {
            for (let i = 0; i < result_users.length; i++) {
                result_users[i].dataValues.count_posts = 0;
                for (let j = 0; j < result_posts.length; j++) {
                    if (result_users[i].id === result_posts[j].user_id) {
                        result_users[i].dataValues.count_posts++;
                    }
                }
            }
            result_users.sort((a, b) => {
                return b.dataValues.count_posts - a.dataValues.count_posts;
            });
            delete result_users[0].dataValues.password;
            delete result_users[0].dataValues.login;
            res.json(result_users[0]);
        })
    })
});

// самый активный комментатор
router.get('/commentator', (req, res, next) => {
    Users.findAll((result_users) => {
        Comments.findAll((result_comments) => {
            for (let i = 0; i < result_users.length; i++) {
                result_users[i].dataValues.count_comments = 0;
                for (let j = 0; j < result_comments.length; j++) {
                    if (result_users[i].id === result_comments[j].user_id) {
                        result_users[i].dataValues.count_comments++;
                    }
                }
            }
            result_users.sort((a, b) => {
                return b.dataValues.count_comments - a.dataValues.count_comments;
            });
            delete result_users[0].dataValues.password;
            delete result_users[0].dataValues.login;
            res.json(result_users[0]);
        })
    })
});

// пользователи, отметившие пост
router.get('/like-post/:post_id', (req, res, next) => {
    let users = [];
    PostLikes.findByPostId(req.params.post_id, (result_likes) => {
        for (let i = 0; i < result_likes.length; i++) {
            Users.findById(result_likes[i].user_id, (result_user) => {
                delete result_user.dataValues.password;
                delete result_user.dataValues.login;
                users.push(result_user.dataValues);
                if (i === result_likes.length - 1) res.json(users);
            });
        }
    })
});

// пользователи, отметившие комментарий
router.get('/like-comment/:comment_id', (req, res, next) => {
    let users = [];
    CommentLikes.findByCommentId(req.params.comment_id, (result_likes) => {
        for (let i = 0; i < result_likes.length; i++) {
            Users.findById(result_likes[i].user_id, (result_user) => {
                delete result_user.dataValues.password;
                delete result_user.dataValues.login;
                users.push(result_user.dataValues);
                if (i === result_likes.length - 1) res.json(users);
            })
        }
    })
});



// один пользователь по id
router.get('/:user_id', (req, res, next) => {
   Users.findById(req.params.user_id, (result) => {
       delete result.dataValues.password;
       delete result.dataValues.login;
       res.json(result);
   })
});

module.exports = router;