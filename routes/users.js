const express = require('express');
const router = express.Router();

const Users = require('../models/usersRequests');
const Posts = require('../models/postsRequests');
const Comments = require('../models/commentsRequests');
const PostLikes = require('../models/posts_likesRequests');
const CommentLikes = require('../models/comments_likesRequests');

// все пользователи
router.get('/', (req, res, next) => {
   Users.findAll((result) => {
       let modified_users = result.map((user, index) => {
            return user;
       });
       res.json(modified_users);
   })
});

// выборка пользователей для автоподгрузки
router.get('/sample/', (req, res, next) => {
   Users.findSample(10, +req.query.offset, (result) => {
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
    console.log('!!!!!!!! API USERS  id');
   Users.findUserById(req.params.user_id, (result) => {
       res.json(result);
   })
});

module.exports = router;