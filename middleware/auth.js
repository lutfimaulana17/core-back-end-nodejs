const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'my_secret')
        req.user_id = decoded.id
        next()
      } catch (e) {
        res
        .status(400)
        .send({message: 'invalid credential token!'})
      }
}


module.exports = auth