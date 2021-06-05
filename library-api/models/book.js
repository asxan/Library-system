import mongoose from 'mongoose';
import AuthorModel from './author.js'

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const model = mongoose.model;

let schema = new Schema(
  {
    name: String,
    publishingHouse: String,
    publicationYear: Number,
    authors: [{_id: ObjectId, pseudonym: String}],
    genres: [{type: ObjectId}],
    booksEditions: [
      {
        _id: {type: ObjectId, default: new ObjectId()},
        bookId: ObjectId,
        pablishedYear: Number,
        language: String,
        cover: String,
        printedType: String,
        pages: Number,
        available: {type: Boolean, default: true}
      }],
    description: String,
    photo: String
  })

const bookModel = model('books', schema, 'books');

export default bookModel