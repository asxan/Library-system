import express from 'express';
import BookModel from '../models/book.js';
import mongoose from 'mongoose';
import auth from '../middlewares/auth.js';
import OrderModel from '../models/order.js';
import OrderStatus from '../models/orderStatus.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const log = (req) => console.log("\x1b[33m", req.method, req.url, "\x1b[0m");

router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

router.post('/api/order/', auth.verify, async (req, res) => {
  log(req)

  let order = req.body;
  order.orderDate = new Date().toLocaleDateString("en-US")
  order.status = OrderStatus.NEW;
  order.endDate = new Date(new Date() + order.days).toLocaleDateString("en-US");
  order.user = req.user._id;

  let book = await BookModel.findById(new ObjectId(order.book));

  if (!book) {
    res.status(404).send('Book not found');
    return;
  }

  let sameOrder = await OrderModel.find({ edition: new ObjectId(order.edition)});

  if (sameOrder.length > 0 && 
    sameOrder.some(s => s.status != OrderStatus.COMPLETED && s.status != OrderStatus.CANCELED)) {
    res.status(400).send("This book edition already ordered")
    return;
  }

  const query = { '_id': new ObjectId(order.book), "booksEditions._id": new ObjectId(order.edition) };
  const updateDocument = { $set: { "booksEditions.$.available": false } };

  await BookModel.updateOne(query, updateDocument);
  await OrderModel.create(order);
  res.status(200).json();
  return;
});

router.get('/api/orders/:id', auth.verify, async (req, res) => {
  log(req)

  let targetUserId = req.params.id;

  if (targetUserId != req.user._id && req.user.role != 'admin') {
    res.sendStatus(403);
    return;
  }

  let orders = await OrderModel.find({ user: new ObjectId(targetUserId) });

  let result = [];
  orders.map(order => {
    BookModel.findOne({ _id: new ObjectId(order.book) }).then(
      book => {
        let edition = book.booksEditions
          .find(e => String(e._id) == String(order.edition));

        result.push({
          ...order.toObject(),
          book,
          edition
        });

        if (order == orders[orders.length - 1]) {
          res.json(result);
        }
      }
    );
  })
})

router.get('/api/orders', auth.verify, async (req, res) => {
  log(req)

  if (req.user.role != 'admin') {
    res.sendStatus(403);
    return;
  }

  let orders = await OrderModel.find({});

  let result = [];
  orders.map(order => {
    BookModel.findOne({ _id: new ObjectId(order.book) }).then(
      book => {
        let edition = book.booksEditions
          .find(e => String(e._id) == String(order.edition));

        result.push({
          ...order.toObject(),
          book,
          edition
        });

        if (order == orders[orders.length - 1]) {
          res.json(result);
        }
      }
    );
  })
})

router.put('/api/order/cancel/:id', auth.verify, async (req, res) => {
  log(req)

  let orderId = req.params.id;
  let order = await OrderModel.findById(new ObjectId(orderId))
  console.log(order)
  if (!order) {
    res.sendStatus(404);
    return;
  }

  if (String(order.user) != String(req.user._id) && req.user.role != 'admin') {
    res.sendStatus(403);
    return;
  }

  if (order.status != OrderStatus.NEW && order.status != OrderStatus.READY) {
    res.sendStatus(403);
    return;
  }

  order.status = OrderStatus.CANCELED;
  await order.save();

  const query = { '_id': new ObjectId(order.book), "booksEditions._id": new ObjectId(order.edition) };
  const updateDocument = { $set: { "booksEditions.$.available": true } };

  await BookModel.updateOne(query, updateDocument);

  res.status(200).json();
})

router.put('/api/order/approve/:id', auth.verify, async (req, res) => {
  log(req)

  let orderId = req.params.id;
  let order = await OrderModel.findById(new ObjectId(orderId))
  console.log(order)
  if (!order) {
    res.sendStatus(404);
    return;
  }

  if (order.user != req.user._id && req.user.role != 'admin') {
    res.sendStatus(403);
    return;
  }

  if (order.status != OrderStatus.NEW) {
    res.sendStatus(403);
    return;
  }

  order.status = OrderStatus.READY;

  await order.save();

  res.status(200).json();
})

router.put('/api/order/giveout/:id', auth.verify, async (req, res) => {
  log(req)

  let orderId = req.params.id;
  let order = await OrderModel.findById(new ObjectId(orderId))
  console.log(order)
  if (!order) {
    res.sendStatus(404);
    return;
  }

  if (order.user != req.user._id && req.user.role != 'admin') {
    res.sendStatus(403);
    return;
  }

  if (order.status != OrderStatus.READY) {
    res.sendStatus(403);
    return;
  }

  order.status = OrderStatus.WAITING_FOR_RETURN;

  await order.save();

  res.status(200).json();
})

router.put('/api/order/complete/:id', auth.verify, async (req, res) => {
  log(req)

  let orderId = req.params.id;
  let order = await OrderModel.findById(new ObjectId(orderId))
  console.log(order)
  if (!order) {
    res.sendStatus(404);
    return;
  }

  if (order.user != req.user._id && req.user.role != 'admin') {
    res.sendStatus(403);
    return;
  }

  if (order.status != OrderStatus.WAITING_FOR_RETURN) {
    res.sendStatus(403);
    return;
  }

  order.status = OrderStatus.COMPLETED;

  await order.save();

  const query = { '_id': new ObjectId(order.book), "booksEditions._id": new ObjectId(order.edition) };
  const updateDocument = { $set: { "booksEditions.$.available": true } };

  await BookModel.updateOne(query, updateDocument);

  res.status(200).json();
})

export default router

