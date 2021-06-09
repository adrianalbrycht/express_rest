const Post = require('../models/post');

module.exports = {

    getAll(req, res) {
        Post.findAll()
            .then(posts => {
                res.send(posts);
            })
            .catch(err => console.log(err));
    },

    get(req, res) {
        Post.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(post => {
                if (post) {
                    res.send(post);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(err => console.log(err));
    },

    create(req, res) {
        Post.create(req.body).then(() => {
            res.sendStatus(201);
        }).catch(err => console.log(err));
    },

    update(req, res) {
        Post.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(post => {
            if (post) {
                res.sendStatus(202);
            } else {
                res.sendStatus(404);
            }
        })
            .catch(err => console.log(err));
    },

    delete(req, res) {
        Post.findOne(req.body, {
            where: {
                id: req.params.id
            }
        }).then(post => {
            if (post) {
                post.destroy();
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        })
            .catch(err => console.log(err));
    },

    deleteInBatch(req, res) {
        Post.destroy({
            where:
                {
                    id: req.body // table json { "id": [1,2,3] }
                }
        }).then(post => {
            if (post) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        })
            .catch(err => console.log(err));
    },
}
