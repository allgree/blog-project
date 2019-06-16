const express = require('express');

const router = express.Router();

const Comments = require('../requests/commentsRequests');
const CommentLikes = require('../requests/commentsLikesRequests');
const Users = require('../requests/usersRequests');

// выборка десяти комментариев к посту для автоподгрузки
router.get('/sample/post/', (req, res, next) => {
    let {offset, post_id} = req.query;
    let result = [];
    let likes = [];
    Comments.findByPostIdSample(10, +offset, +post_id).then(result_comments => {
        result_comments.forEach((comment, i) => {
            result[i] = result_comments[i].dataValues;
            likes.push(CommentLikes.findByCommentId(comment.id));
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

// добавить комментарий
router.post('/add/', (req, res, next) => {
    let {post_id, user_id, body} = req.body;
    let comment;
    Comments.add(post_id, user_id, body).then(result_comment => {
        comment = result_comment.dataValues;
        return Users.findUserByIdForNewItem(user_id);
    }).then(result_user => {
        comment.author = result_user.dataValues;
        comment.likes = [];
        res.json(comment);
    });
});


// удалить комментарий
router.post('/delete/', (req, res, next) => {
    Comments.deleteById(req.body.comment_id).then(result => {
        res.json(result);
    });
});

module.exports = router;