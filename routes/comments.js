const express = require('express');

const router = express.Router();

const  Comments = require('../models/comments');
const CommentsLikes = require('../models/comments_likes');

 //все комментарии
//router.get('/', (req, res, next) => {
//   Comments.findAll((result_comments) => {
//       CommentsLikes.findAll((result_comments_likes) => {
//           for (let i = 0; i < result_comments.length; i++) {
//               let likes = result_comments_likes.filter(like => like.comment_id === result_comments[i].id);
//               result_comments[i].dataValues.likes = likes.length;
//           }
//           res.json(result_comments);
//       })
//   })
//});



// все комментарии к одному посту
router.get('/post/:post_id', (req, res, next) => {
   Comments.findByPostId(req.params.post_id, (result_comments) => {
       CommentsLikes.findAll((result_comments_likes) => {
           for (let i = 0; i < result_comments.length; i++) {
               let likes = result_comments_likes.filter(like => like.comment_id === result_comments[i].id);
               result_comments[i].dataValues.likes = likes.length;
           }
           res.json(result_comments);
       })
   })
});


// выборка пяти комментариев для автоподгрузки
router.get('/sample/post/', (req, res, next) => {
    Comments.findByPostIdSample(5, +req.query.offset, +req.query.post_id, (result_comments) => {
        CommentsLikes.findAll((result_comments_likes) => {
            for (let i = 0; i < result_comments.length; i++) {
                let likes = result_comments_likes.filter(like => like.comment_id === result_comments[i].id);
                result_comments[i].dataValues.likes = likes.length;
            }
            res.json(result_comments);
        });
    });
});

router.post('/add/', (req, res, next) => {
    Comments.add(req.body.post_id, req.body.user_id, req.body.body, (result) => {
        res.json(result.dataValues);
    })
});

router.post('/delete/', (req, res, next) => {
    Comments.delete(req.body.comment_id, (result) => {
        res.json(result);
    })
});

module.exports = router;