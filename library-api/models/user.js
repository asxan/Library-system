import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
  {
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
      select: false
    },
    email: {
      type: String,
      unique: true,
      require: true
    },
    role: {
      type: String,
      default: 'user'
    }    
  }
)
const userModel = model('users', schema, 'users');

export default userModel