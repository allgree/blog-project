const express = require('express');

const router = express.Router();

const Comments = require('../models/commentsRequests');

// выборка пяти комментариев к посту для автоподгрузки
router.get('/sample/post/', (req, res, next) => {
    Comments.findByPostIdSample(5, +req.query.offset, +req.query.post_id, (result_comments) => {
        res.json(result_comments);
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