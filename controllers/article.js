const uuid = require('uuid/v4');
const Article = require('../models').Article;
const User = require('../models').User;
const Category = require('../models').Category;
const fs = require('fs');
const path = require('path');

module.exports = {
    read(req, res) {
        return Article
            .findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    }, {
                        model: Category,
                        as: 'category'
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((article) => res.status(200).send(article))
            .catch((error) => {
                res
                    .status(400)
                    .send(error);
            });
    },

    edit(req, res) {
        return Article
            .findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            })
            .then((article) => {
                if (!article) {
                    return res
                        .status(404)
                        .send({message: 'Article Not Found'});
                } else {
                    return res
                        .status(200)
                        .send(article);
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        return Article
            .create({
                id: uuid(),
                title: req.body.title,
                content: req.body.content,
                tag: req.body.tag,
                category_id: req.body.category_id,
                user_id: req.user_id
            })
            .then((article) => res.status(201).send(article))
            .catch((error) => res.status(400).send({
                message: error
                    .errors[0]
                    .message
            }));
    },

    update(req, res) {
        return Article
            .findByPk(req.params.id)
            .then(article => {
                if (!article) {
                    return res
                        .status(404)
                        .send({message: 'Article Not Found'});
                } else {
                    return article
                        .update(
                            {title: req.body.title, content: req.body.content, tag: req.body.tag, category_id: req.body.category_id}
                        )
                        .then(() => res.status(200).send(article))
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
        return Article
            .findByPk(req.params.id)
            .then(article => {
                if (!article) {
                    return res
                        .status(400)
                        .send({message: 'Article Not Found'});
                } else {
                    if (article.file_name != null) {
                        fs.unlink(path.join(
                            __dirname + './../public/images/article/' + article.file_name
                        ), (err) => {
                            if (err) {
                                return res
                                    .status(400)
                                    .send(err)
                            } else {
                                return article
                                    .destroy()
                                    .then(() => res.status(204).send())
                                    .catch((error) => res.status(400).send(error));
                            }

                        });
                    } else {
                        return article
                            .destroy()
                            .then(() => res.status(204).send())
                            .catch((error) => res.status(400).send(error));
                    }
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    upload(req, res) {
        return Article
            .findByPk(req.params.id)
            .then(article => {
                if (!article) {
                    return res
                        .status(404)
                        .send({message: 'Article Not Found'});
                } else {
                    if (article.file_name != null) {
                        fs.unlink(path.join(
                            __dirname + './../public/images/article/' + article.file_name
                        ), (err) => {
                            if (err) {
                                return res
                                    .status(400)
                                    .send(err)
                            } else {
                                return article
                                    .update({file_name: req.file.filename})
                                    .then(() => res.status(200).send(article))
                                    .catch((error) => res.status(400).send({
                                        message: error
                                            .errors[0]
                                            .message
                                    }));
                            }

                        });
                    } else {
                        return article
                            .update({file_name: req.file.filename})
                            .then(() => res.status(200).send(article))
                            .catch((error) => res.status(400).send({
                                message: error
                                    .errors[0]
                                    .message
                            }));
                    }
                }

            })
            .catch((error) => res.status(400).send(error));
    }
};