import jwt from 'jsonwebtoken';
const tokenSecret = "secretkey"

const exports = {}

exports.verify = (req, res, next) => {
  const token = req.headers.authorization
  console.log(token)
  if (!token) res.sendStatus(401)
  else {
    jwt.verify(token.split(" ")[1], tokenSecret, (error, value) => {
      if (error) res.sendStatus(401)
      req.userId = value.data
      next()
    })
  }
}
export default exports