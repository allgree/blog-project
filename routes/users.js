const express = require('express');
const router = express.Router();

const Users = require('../requests/usersRequests');
const PostLikes = require('../requests/postsLikesRequests');
const CommentLikes = require('../requests/commentsLikesRequests');


// выборка пользователей для автоподгрузки
router.get('/sample/', (req, res, next) => {
   Users.findSample(10, +req.query.offset, req.query.val_1, req.query.val_2, result => {
       res.json(result);
   })
});

// самый активный блогер
router.get('/bloger/', (req, res, next) => {
   Users.findTopBloger(result => {
       res.json(result[0]);
   })
});

// самый активный комментатор
router.get('/commentator/', (req, res, next) => {
    Users.findTopCommentator(result => {
        res.json(result[0]);
    })
});

// пользователи, отметившие пост
router.get('/like-post/:post_id', (req, res, next) => {
    let users = [];
    PostLikes.findByPostId(req.params.post_id, (result_likes) => {
        for (let i = 0; i < result_likes.length; i++) {
            Users.findUserById(result_likes[i].user_id, (result_user) => {
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
            Users.findUserById(result_likes[i].user_id, (result_user) => {
                users.push(result_user.dataValues);
                if (i === result_likes.length - 1) res.json(users);
            })
        }
    })
});

// один пользователь по id
router.get('/:user_id', (req, res, next) => {
   Users.findUserById(req.params.user_id, (result) => {
       res.json(result);
   })
});

module.exports = router;