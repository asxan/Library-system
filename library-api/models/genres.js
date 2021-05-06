import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const genresModel = model('genres', new Schema(), 'genres');

export default genresModel