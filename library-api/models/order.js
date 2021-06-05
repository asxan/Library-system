import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const model = mongoose.model;

let schema = new Schema(
  {
    user: {type: ObjectId, require: true},
    book: {type: ObjectId, require: true},
    edition: {type: ObjectId, require: true},
    orderDate: {type: String, require: true},
    endDate: {type: String, require: true},
    status: {type: String, require: true}
  })

const createOrdeModel = model('orders', schema, 'orders');

export default createOrdeModel