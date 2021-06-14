const User = require('../models/user');
const v = require('../middleware/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    getAll(req, res) {
        User.findAll()
            .then(users => {
                res.send(users);
            })
            .catch(err => console.log(err));
    },

    get(req, res) {
        User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                if (user) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(err => console.log(err));
    },

    create(req, res, next) {
        try {
            const validation = v.userCreateValidation(req.body);
            if (!validation.error) {
                User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                    .then(async user => {
                        if (user) {
                            res.sendStatus(409);
                        } else {
                            req.body.password = await bcrypt.hash(req.body.password, 10);
                            User.create(req.body);
                            res.sendStatus(201);
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                res.status(400).send(validation.error.details);
            }

        } catch (err) {
            next(err);
        }
    },

    login(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(async user => {
                if (!await bcrypt.compare(req.body.password, user.password)) {
                    res.sendStatus(401);
                } else {
                    const jwtToken = jwt.sign(user.email, user.password);
                    res.json({token: jwtToken});
                }
            })
            .catch(err => console.log(err));
    },

    update(req, res) {
        User.update(req.body, {
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
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (user) {
                user.destroy();
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        })
            .catch(err => console.log(err));
    },

    deleteInBatch(req, res) {
        User.destroy({
            where:
                {
                    id: req.body // table json { "id": [1,2,3] }
                }
        }).then(user => {
            if (user) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        })
            .catch(err => console.log(err));
    },
}
