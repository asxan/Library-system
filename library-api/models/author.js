import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

let schema = new Schema(
  {
    fullName: String,
    pseudonym: String,
    books: [],
    photo: String
  }
)
const authorModel = model('authors', schema, 'authors');

export default authorModel