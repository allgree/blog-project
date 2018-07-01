const PostsModel = require('./postsModel');

let Posts = {
    findAll: (callback) => {
        PostsModel.findAll({})
             .then(result => {
                 callback(result);
             })
    },

    findSample: (limit, offset, callback) => {
        PostsModel.findAll({
              offset: offset,
              limit: limit,
              order: [['createdAt', 'DESC']]
          })
              .then(result => {
                  callback(result);
              })
    },
    findById: (post_id, callback) => {
        PostsModel.findOne({
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },

    findByUserIdSample: (limit, offset, user_id, callback) => {
        PostsModel.findAll({
            where: {
                user_id: user_id
            },
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
            .then(result => {
                callback(result);
            })
    },
    add: (user_id, title, body, callback) => {
        PostsModel.create({
            user_id: user_id,
            title: title,
            body: body,
            views: 0
        })
            .then(result => {
                callback(result);
            })
    },
    delete: (post_id, callback) => {
        PostsModel.destroy({
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    updateViews: (post_id, views, callback) => {
        PostsModel.update({
            views: views
        }, {
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    }
};

module.exports = Posts;