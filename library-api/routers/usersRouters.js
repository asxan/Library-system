import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import auth from '../middlewares/auth.js'

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const log = (req) => console.log("\x1b[33m", req.method, req.url, "\x1b[0m");

const secretWord = "secretkey";

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/api/reg', async (req, res) => {
  log(req);

  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error) res.status(500).send(error)
    else {
      const newUser = User({ ...req.body, password: hash });
      newUser.save()
        .then(user => {
          res.status(200).json({ user, token: generateToken(user._id) })
        })
        .catch(error => {
          res.status(500).json(error)
        })
    }
  })

});

router.post('/api/login', (req, res) => {
  log(req);

  User.findOne({ email: req.body.email }).select('+password')
    .then(user => {
      if (!user) res.status(404).json({ error: 'No user with that email found' })
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error){
            
      console.log(req.body.password,user.password )
      res.status(500).json(error)}
          else if (match) {
            user.password = null;
            res.status(200).json({ user, token: generateToken(user._id) })
          }

          else res.status(403).json({ error: 'Password do not match' })
        })
      }
    })
    .catch(error => {
      console.log("catch")
      res.status(500).json(error)
    })
});

router.get('/api/user', auth.verify, (req, res) => {
  log(req);

  User.findOne({ _id: new ObjectId(req.userId) })
    .then(user => {

      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      res.status(401)
    })
})

function generateToken(payload) {
  return jwt.sign({ data: payload }, secretWord, { expiresIn: '24h' });
}


export default router