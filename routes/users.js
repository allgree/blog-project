const express = require('express');

const router = express.Router();

const Users = require('../models/users');
const Posts = require('../models/posts');
const Comments = require('../models/comments');

// все пользователи
router.get('/', (req, res, next) => {
   Users.findAll((result) => {
       res.json(result);
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
            res.json(result_users[0]);
        })
    })
});

// один пользователь по id
router.get('/:user_id', (req, res, next) => {
   Users.findById(req.params.user_id, (result) => {
       res.json(result);
   })
});

module.exports = router;