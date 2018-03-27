const express = require('express');
const multiparty = require('multiparty');
const crypto = require('crypto');
const router = express.Router();
const FirebaseTokenGenerator = require("firebase-token-generator");
const tokenGenerator = new FirebaseTokenGenerator("<YOUR_FIREBASE_SECRET>");

const Salts = require('../salts');

const Users = require('../models/users');
const Posts = require('../models/posts');
const Comments = require('../models/comments');
const PostLikes = require('../models/posts_likes');
const CommentLikes = require('../models/comments_likes');
const Tokens = require('../models/tokens');

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

// авторизующийся пользователь
router.post('/login', (req, res, next) => {
      Users.findByLogin(req.body.login, (result) => {
          let hash_pass = crypto.createHash('md5')
                                        .update(Salts.salt1 + req.body.password + Salts.salt2)
                                        .digest('hex');
          if (hash_pass !== result.dataValues.password) {
              return res.json({});
          } else {
              delete result.dataValues.password;
              delete result.dataValues.login;
              let token = tokenGenerator.createToken({uid: String(result.id), some: "arbitrary", data: "here"});
              Tokens.updateByUserId(result.id, token, (result) => {
                  console.log(result);
              });
              result.dataValues.token = token;
              res.json(result);
          }
      })
});

router.post('/unlogged', (req, res, next) => {
    Tokens.updateByUserId(req.body.user_id, null, (result) => {
       console.log('RESULT UNLOGGED TOKEN ');
       console.log(result);
       if (result[0] === 1) {
           res.json({result: 1})
       }
   })
});

router.post('/avatar', (req, res, next) => {
    console.log(req.body);
    let form = new multiparty.Form();

    form.on('part', function(part) {
        // You *must* act on the part by reading it
        // NOTE: if you want to ignore it, just call "part.resume()"

        if (!part.filename) {
            // filename is not defined when this is a field and not a file
            console.log('got field named ' + part.name);
            // ignore field's content
            part.resume();
        }
//
        if (part.filename) {
            // filename is defined when this is a file
            //count++;
            console.log('got file named ' + part.name);
            // ignore file's content here
            part.resume();
        }

        part.on('error', function(err) {
            // decide what to do
        });
    });
    //form.parse(req, function(err, fields, files) {
    //console.log(fields);
    //let fiels_name = Object.keys(files)[0];
    //console.log(files[fiels_name][0]);
    //Object.keys(fields).forEach(function(name) {
    //    console.log('got field named ' + name);
    //});
////
    //Object.keys(files).forEach(function(name) {
    //    console.log('got file named ' + name);
    //});
//
    //console.log('Upload completed!');
    //res.setHeader('text/plain');
    //res.end('Received ' + files.length + ' files');
    //});

    form.parse(req);
});

router.post('/register',  (req, res, next) => {
    let avatar = '/img/avatars/default.jpeg';
    let password = crypto.createHash('md5')
                         .update(Salts.salt1 + req.body.pass1 + Salts.salt2)
                         .digest('hex');
    Users.register(req.body, avatar, password, (result_users) => {
        Tokens.addUserId(result_users.id, (result_tokens) => {
            console.log(result_tokens.dataValues);
        });
        res.json(result_users.dataValues);
    })
});



module.exports = router;