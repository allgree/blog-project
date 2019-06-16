const express = require('express');
const multiparty = require('multiparty');
const crypto = require('crypto');
const router = express.Router();
const FirebaseTokenGenerator = require("firebase-token-generator");
const tokenGenerator = new FirebaseTokenGenerator("<YOUR_FIREBASE_SECRET>");
const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');

let salts = {
    salt1: 'lhglkghkhkjn',
    salt2: 'asdadfasfasfasf'
};

const Users = require('../requests/usersRequests');
const Tokens = require('../requests/tokensRequests');

// регистрация
router.post('/register/',  (req, res, next) => {
    let avatar = '/img/avatars/default.jpeg';
    let user;
    Users.register(req.body, avatar, hashPass(req.body.pass1)).then(result_user => {
        user = result_user;
        return Tokens.addUserId(result_user.id);
    }).then(() => {
        res.json(user);
    });
});

// запрос наличия логина для избежания повторяющегося логина
router.get('/check-login/', (req, res, next) => {
    Users.findByLogin(req.query.login).then(result => {
        result === null ? res.json(1) : res.json(0);
    });
});

// авторизация пользователя
router.post('/login/', (req, res, next) => {
    let {login, password, remember_me} = req.body;
    let user;
    Users.findByLogin(login).then(result => {
        if (!result) {
            return false;
        }
        if (hashPass(password) !== result.dataValues.password) {
            return false;
        } else {
            let {id, login, name, surname, city, age, site, email, avatar_path} = result;
            user = {id, login, name, surname, city, age, site, email, avatar_path};
            let token = tokenGenerator.createToken({uid: String(result.id), some: "arbitrary", data: "here"});
            req.session.token = token;
            if (remember_me) {
                req.sessionOptions.maxAge = 1000 * 60 *60 * 24 * 7;
            }
            return Tokens.updateByUserId(result.id, token);
        }
    }).then(token => {
        token ? res.json(user) : res.json({});
    });
});

// запрос авторизованного пользователя
router.get('/login-data', (req, res, next) => {
    if (req.session.token) {
        Tokens.findByToken(req.session.token).then(result_token => {
            return result_token
                ? Users.findLoginById(+result_token.user_id)
                : false;
        }).then(result_user => {
            res.json(result_user || 0);
        });
    } else {
        res.json(0);
    }
});

// выход из аккаунта
router.post('/unlogged', (req, res, next) => {
    Tokens.updateByUserId(req.body.user_id, null).then(result => {
        if (result[0] === 1) {
            delete req.session.token;
            res.json({result: 1})
        }
    });
});

// редактирование профиля
router.post('/edit', (req, res, next) => {
    Users.editProfile(req.body).then(result => {
        res.json(result);
    });
});

//изменение пароля
router.post('/pass', (req, res, next) => {
    Users.findLoginForPass(req.body.user_id).then(result_user => {
        let hash_old_pass = crypto.createHash('md5')
            .update(salts.salt1 + req.body.password + salts.salt2)
            .digest('hex');
        if (result_user.password !== hash_old_pass) {
            return false
        } else {
            return Users.editPass(req.body.user_id, hashPass(req.body.new_pass))
        }
    }).then(result_pass => {
        result_pass
            ? res.json({result: 1})
            : res.json({result: 0})
    });
});

// смена аватара
router.post('/avatar', (req, res, next) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        let user_id = +fields.user_id[0];
        let temp_path = files.avatar[0].path;
        let file_name = `ava_${user_id}_${files.avatar[0].originalFilename}`;
        let new_base_path = `/img/avatars/${file_name}`;
        Users.findLoginById(user_id).then(result_user => {
            let old_base_path = result_user.dataValues.avatar_path;
            let name_avatar = old_base_path.split('/').pop().split('\\').pop();
            if (name_avatar !== 'default.jpeg') {
                // TODO для разработки
                fs.unlink(`./src${old_base_path}`, (err) => {if(err) console.log(err);});
                // TODO end для разработки
                fs.unlink(`./public${old_base_path}`, (err) => {if(err) console.log(err);});
            }
            // TODO для разработки
            imagemin([temp_path],
                './src/img/avatars',
                {plugins: [imageminJpegtran()]})
                .then(data => {
                    fs.rename(data[0].path, `./src/img/avatars/${file_name}`, err => {if (err) throw err});
                });
            // TODO end для разработки
            return imagemin(
                [temp_path],
                './public/img/avatars',
                {plugins: [imageminJpegtran()]})
        }).then(data => {
            fs.rename(data[0].path, `./public/img/avatars/${file_name}`, err => {if (err) throw err});
            return Users.editAvatar(user_id, new_base_path);
        }).then(result => {
            fs.unlink(temp_path, err => {if (err) throw err});
            res.json({result: result[0], avatar_path: new_base_path});
        });


    });
});

function hashPass(password) {
    return crypto.createHash('md5')
        .update(salts.salt1 + password + salts.salt2)
        .digest('hex')
}

module.exports = router;