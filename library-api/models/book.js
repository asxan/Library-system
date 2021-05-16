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
    booksEditions: [
      {
        _id: ObjectId,
        bookId: ObjectId,
        pablishedYear: Number,
        language: String,
        cover: String,
        printedType: String,
        pages: Number
      }],
    description: String,
    photo: String
  })

const bookModel = model('books', schema, 'books');

export default bookModel