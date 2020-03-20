const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs');
const Category = require('../models').Category;
const User = require('../models').User;

module.exports = {
    read(req, res) {
        return User
            .findAll({
                include: [],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((users) => res.status(200).send(users))
            .catch((error) => {
                res
                    .status(400)
                    .send(error);
            });
    },

    edit(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [
                    {
                        model: Category,
                        as: 'category'
                    }
                ]
            })
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .send({message: 'User Not Found'});
                } else {
                    return res
                        .status(200)
                        .send(user);
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        if (!req.body.password) {
            return res
                .status(404)
                .send({message: 'Please cek your input password'});
        } else {
            return User
                .create({
                    id: uuid(),
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password)
                })
                .then((user) => res.status(201).send(user))
                .catch((error) => res.status(400).send({
                    message: error
                        .errors[0]
                        .message
                }));
        }

    },

    update(req, res) {
        if (!req.body.password) {
            return res
                .status(404)
                .send({message: 'Please cek your input password'});
        }
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res
                        .status(404)
                        .send({message: 'User Not Found'});
                } else {
                    return user
                        .update({
                            name: req.body.name,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password)
                        })
                        .then(() => res.status(200).send(user))
                        .catch((error) => res.status(400).send({
                            message: error
                                .errors[0]
                                .message
                        }));
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res
                        .status(400)
                        .send({message: 'User Not Found'});
                } else {
                    return user
                        .destroy()
                        .then(() => res.status(204).send())
                        .catch((error) => res.status(400).send(error));
                }

            })
            .catch((error) => res.status(400).send(error));
    }
};