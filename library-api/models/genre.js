import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const genreModel = model('genres', new Schema(), 'genres');

export default genreModel