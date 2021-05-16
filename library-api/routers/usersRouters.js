import express from 'express';
import userModel from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const log = (req) => console.log("\x1b[33m", req.method, req.url, "\x1b[0m");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/api/reg', async (req, res) => {
  log(req);
  let user = new userModel(req.body);

  if (!user.username && !user.password && !user.email) {
    res.status(400).send("Need to fill all fields");
    return;
  }

  var salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  var checkUser = await userModel.findOne({ email: user.email });

  if (!checkUser) {
    userModel.create(user)
      .then(() => res.sendStatus(200))
      .catch((error) => res.status(400).send(error));
  }
  else {
    res.status(400).send("Current email already is used");
  }
})

router.post('/api/login', async (req, res) => {
  log(req);
  let credentials = req.body;
  
  if (!credentials.password && !credentials.email) {
    res.status(400).send("Need to fill all fields");
    return;
  }

  var checkUser = await userModel.findOne({ email: credentials.email });
  var userIsTrue = checkUser && await bcrypt.compare(credentials.password, checkUser.password);
  
  if (userIsTrue) {
    res.sendStatus(200);
  }
  else {
    res.status(403).send("Invalid credentials");
  }
})

private generateToken(user) {

  const data =  {
    _id: user._id,
    name: user.name,
    email: user.email
  };
  const signature = 'MySuP3R_z3kr3t';
  const expiration = '6h';

  return jwt.sign({ data, }, signature, { expiresIn: expiration });


export default router