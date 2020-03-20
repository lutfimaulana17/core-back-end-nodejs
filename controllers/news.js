const uuid = require('uuid/v4');
const News = require('../models').News;
const User = require('../models').User;
const Category = require('../models').Category;
const fs = require('fs');
const path = require('path');

module.exports = {
    read(req, res) {
        return News
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
            .then((news) => res.status(200).send(news))
            .catch((error) => {
                res
                    .status(400)
                    .send(error);
            });
    },

    edit(req, res) {
        return News
            .findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            })
            .then((news) => {
                if (!news) {
                    return res
                        .status(404)
                        .send({message: 'News Not Found'});
                } else {
                    return res
                        .status(200)
                        .send(news);
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        return News
            .create({
                id: uuid(),
                title: req.body.title,
                content: req.body.content,
                tag: req.body.tag,
                category_id: req.body.category_id,
                user_id: req.user_id
            })
            .then((news) => res.status(201).send(news))
            .catch((error) => res.status(400).send({
                message: error
                    .errors[0]
                    .message
            }));
    },

    update(req, res) {
        return News
            .findByPk(req.params.id)
            .then(news => {
                if (!news) {
                    return res
                        .status(404)
                        .send({message: 'News Not Found'});
                } else {
                    return news
                        .update(
                            {title: req.body.title, content: req.body.content, tag: req.body.tag, category_id: req.body.category_id}
                        )
                        .then(() => res.status(200).send(news))
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
        return News
            .findByPk(req.params.id)
            .then(news => {
                if (!news) {
                    return res
                        .status(400)
                        .send({message: 'News Not Found'});
                } else {
                    if (news.file_name != null) {
                        fs.unlink(path.join(
                            __dirname + './../public/images/news/' + news.file_name
                        ), (err) => {
                            if (err) {
                                return res
                                    .status(400)
                                    .send(err)
                            } else {
                                return news
                                    .destroy()
                                    .then(() => res.status(204).send())
                                    .catch((error) => res.status(400).send(error));
                            }

                        });
                    } else {
                        return news
                            .destroy()
                            .then(() => res.status(204).send())
                            .catch((error) => res.status(400).send(error));
                    }
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    upload(req, res) {
        return News
            .findByPk(req.params.id)
            .then(news => {
                if (!news) {
                    return res
                        .status(404)
                        .send({message: 'News Not Found'});
                } else {
                    if (news.file_name != null) {
                        fs.unlink(path.join(
                            __dirname + './../public/images/news/' + news.file_name
                        ), (err) => {
                            if (err) {
                                return res
                                    .status(400)
                                    .send(err)
                            } else {
                                return news
                                    .update({file_name: req.file.filename})
                                    .then(() => res.status(200).send(news))
                                    .catch((error) => res.status(400).send({
                                        message: error
                                            .errors[0]
                                            .message
                                    }));
                            }

                        });
                    } else {
                        return news
                            .update({file_name: req.file.filename})
                            .then(() => res.status(200).send(news))
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