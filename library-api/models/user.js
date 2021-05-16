import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
  {
    username: String,
    password: String,
    email: {
      type: String,
      unique: true,
    }    
  }
)
const userModel = model('users', schema, 'users');

export default userModel