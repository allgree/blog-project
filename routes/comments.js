const express = require('express');

const router = express.Router();

const Comments = require('../models/commentsRequests');
const CommentLikes = require('../models/comments_likesRequests');

// выборка пяти комментариев к посту для автоподгрузки
router.get('/sample/post/', (req, res, next) => {
    let result = [];
    let likes = [];
    Comments.findByPostIdSample(5, +req.query.offset, +req.query.post_id, (result_comments) => {
        result_comments.forEach((comment, i) => {
            result[i] = result_comments[i].dataValues;
            likes.push(new Promise((resolve, reject) => {
                CommentLikes.findByCommentId(comment.id, result_likes => {
                   resolve(result_likes);
                });
            }));
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
    Comments.add(req.body.post_id, req.body.user_id, req.body.body, (result) => {
        res.json(result.dataValues);
    })
});


// удалить комментарий
router.post('/delete/', (req, res, next) => {
    Comments.deleteById(req.body.comment_id, (result) => {
        res.json(result);
    })
});

module.exports = router;