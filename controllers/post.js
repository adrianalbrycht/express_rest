const Post = require('../models/post');
const v = require('../middleware/schema');

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

    create(req, res, next) {
        try {
            const validation = v.postCreateValidation(req.body);
            if (!validation.error) {
                Post.create(req.body).then(() => {
                    res.sendStatus(201);
                }).catch(err => console.log(err));
            } else {
                res.status(400).send(validation.error.details);
            }
        } catch (err) {
            next(err);
        }
    },

    update(req, res, next) {
        try {
            const validation = v.postUpdateValidation(req.body);
            if (!validation.error) {
                Post.findOne({
                    where: {
                        id: req.params.id
                    }
                }).then(post => {
                    if (post) {
                        post.update(req.body, {
                                where: {
                                    id: req.params.id
                                }
                            }
                        ).then(res.sendStatus(202));
                    } else {
                        res.sendStatus(404);
                    }
                })
                    .catch(err => console.log(err));
            } else {
                res.status(400).send(validation.error.details);
            }

        } catch (err) {
            next();
        }
    },

    delete(req, res) {
        Post.findOne({
            where: {
                id: req.params.id
            }
        }).then(post => {
            if (post) {
                post.destroy().then(res.sendStatus(204));
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
