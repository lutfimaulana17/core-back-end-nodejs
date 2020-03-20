const uuid = require('uuid/v4');
const Company = require('../models').Company;
const User = require('../models').User;
const Category = require('../models').Category;
const fs = require('fs');
const path = require('path');

module.exports = {
    read(req, res) {
        return Company
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
            .then((company) => res.status(200).send(company))
            .catch((error) => {
                res
                    .status(400)
                    .send(error);
            });
    },

    edit(req, res) {
        return Company
            .findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            })
            .then((company) => {
                if (!company) {
                    return res
                        .status(404)
                        .send({message: 'Company Not Found'});
                } else {
                    return res
                        .status(200)
                        .send(company);
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        return Company
            .create({
                id: uuid(),
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                postal_code: req.body.postal_code,
                city: req.body.city,
                province: req.body.province,
                phone: req.body.phone,
                about: req.body.about,
                visi: req.body.visi,
                misi: req.body.misi,
                user_id: req.user_id
            })
            .then((company) => res.status(201).send(company))
            .catch((error) => res.status(400).send({
                message: error
                    .errors[0]
                    .message
            }));
    },

    update(req, res) {
        return Company
            .findByPk(req.params.id)
            .then(company => {
                if (!company) {
                    return res
                        .status(404)
                        .send({message: 'Company Not Found'});
                } else {
                    return company
                        .update({
                            name: req.body.name,
                            email: req.body.email,
                            address: req.body.address,
                            postal_code: req.body.postal_code,
                            city: req.body.city,
                            province: req.body.province,
                            phone: req.body.phone,
                            about: req.body.about,
                            visi: req.body.visi,
                            misi: req.body.misi
                        })
                        .then(() => res.status(200).send(company))
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
        return Company
            .findByPk(req.params.id)
            .then(company => {
                if (!company) {
                    return res
                        .status(400)
                        .send({message: 'Company Not Found'});
                } else {
                    if (company.file_name != null) {
                        fs.unlink(path.join(
                            __dirname + './../public/images/company/' + company.file_name
                        ), (err) => {
                            if (err) {
                                return res
                                    .status(400)
                                    .send(err)
                            } else {
                                return company
                                    .destroy()
                                    .then(() => res.status(204).send())
                                    .catch((error) => res.status(400).send(error));
                            }

                        });
                    } else {
                        return company
                            .destroy()
                            .then(() => res.status(204).send())
                            .catch((error) => res.status(400).send(error));
                    }
                }

            })
            .catch((error) => res.status(400).send(error));
    },

    upload(req, res) {
        return Company
            .findByPk(req.params.id)
            .then(company => {
                if (!company) {
                    return res
                        .status(404)
                        .send({message: 'Company Not Found'});
                } else {
                    if (company.file_name != null) {
                        fs.unlink(path.join(
                            __dirname + './../public/images/company/' + company.file_name
                        ), (err) => {
                            if (err) {
                                return res
                                    .status(400)
                                    .send(err)
                            } else {
                                return company
                                    .update({file_name: req.file.filename})
                                    .then(() => res.status(200).send(company))
                                    .catch((error) => res.status(400).send({
                                        message: error
                                            .errors[0]
                                            .message
                                    }));
                            }

                        });
                    } else {
                        return company
                            .update({file_name: req.file.filename})
                            .then(() => res.status(200).send(company))
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