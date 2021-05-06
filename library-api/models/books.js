import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const model = mongoose.model;

let schema = new Schema(
  {
    name: String,
    publishingHouse: String,
    publicationYear: Number,
    authors: [{type: ObjectId}],
    genres: [{type: ObjectId}],
    description: String,
    photo: String
  })

const booksModel = model('books', schema, 'books');

export default booksModel