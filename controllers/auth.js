const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs');
const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
    login(req, res) {
        return User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const token = jwt.sign({
                        id: user.id.toString()
                    }, 'my_secret', {expiresIn: '365d'})
                
                    return res
                        .status(200)
                        .send({data:user, token:token});
                }else{
                    return res
                        .status(400)
                        .send({message:'login failed, check your input!'});
                }
                
            })
            .catch((error) => res.status(400).send({ message:'user not found, check your input!',data: error}));
    }
};
