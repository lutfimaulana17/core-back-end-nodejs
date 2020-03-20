const uuid = require('uuid/v4');
const Category = require('../models').Category;
const User = require('../models').User;

module.exports = {
    read(req, res) {
        return Category
            .findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((categories) => res.status(200).send(categories))
            .catch((error) => {
                res
                    .status(400)
                    .send(error);
            });
    },

    edit(req, res) {
        return Category
            .findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            })
            .then((category) => {
                if (!category) {
                    return res
                        .status(404)
                        .send({message: 'Category Not Found'});
                } else {
                    return res
                        .status(200)
                        .send(category);
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        return Category
            .create({id: uuid(), name: req.body.name, user_id: req.user_id})
            .then((category) => res.status(201).send(category))
            .catch((error) => res.status(400).send({
                message: error
                    .errors[0]
                    .message
            }));
    },

    update(req, res) {
        return Category
            .findByPk(req.params.id)
            .then(category => {
                if (!category) {
                    return res
                        .status(404)
                        .send({message: 'Category Not Found'});
                } else {
                    return category
                        .update({name: req.body.name})
                        .then(() => res.status(200).send(category))
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
        return Category
            .findByPk(req.params.id)
            .then(category => {
                if (!category) {
                    return res
                        .status(400)
                        .send({message: 'Category Not Found'});
                } else {
                    return category
                        .destroy()
                        .then(() => res.status(204).send())
                        .catch((error) => res.status(400).send(error));
                }

            })
            .catch((error) => res.status(400).send(error));
    }
};