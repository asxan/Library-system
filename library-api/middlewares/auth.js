import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import mongoose from 'mongoose';

const tokenSecret = "secretkey"
const ObjectId = mongoose.Types.ObjectId;


const exports = {}

exports.verify = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) res.sendStatus(401)
  else {
    jwt.verify(token.split(" ")[1], tokenSecret, (error, value) => {
      if (error) res.sendStatus(401);

      userModel.findById(new ObjectId(value.data))
        .then(user => {
          req.user = user;
          next();
        })
        .catch(error => res.status(401));


    })
  }
}
export default exports