import express from 'express';
import BookModel from '../models/book.js';
import mongoose from 'mongoose';
import auth from '../middlewares/auth.js';
import OrderModel from '../models/order.js';
import AuthorModel from '../models/author.js';
import OrderStatus from '../models/orderStatus.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const log = (req) => console.log("\x1b[33m", req.method, req.url, "\x1b[0m");

router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

router.get('/api/stats/topbooks', async (req, res) => {
  log(req);

  let count = req.query.count ?? 4;

  let orders = Array.from(await OrderModel.find({}));
  let bookids = orders.map(o => o.book)

  let stat = [];
  for (let i = 0; i < bookids.length; i++) {
    let id = bookids[i]
    if (stat.some(s => String(s.book) == String(id))) continue;

    stat.push({
      score: bookids.filter(s => String(s) == String(id)).length,
      book: id
    })
  }

  stat = stat.sort((a, b) => b.score - a.score).slice(0, count > stat.length ? count - 1 : stat.length - 1)

  console.log(stat)
  let books = await BookModel.find({ _id: stat.map(s => new ObjectId(s.book)) })
  books = books.sort((a,b) => 
    stat.find(i => String(i.book) == String(b._id)).score - stat.find(i => String(i.book) == String(a._id)).score)
  
  res.json(books)
})

router.get('/api/stats/topauthors', async (req, res) => {
  log(req);

  let count = req.query.count ?? 4;

  let orders = Array.from(await OrderModel.find({}));

  let authorsIds = [];

  let books = await BookModel.find({ _id: orders.map(s => new ObjectId(s.book)) })

  books.forEach(b => authorsIds.push(...b.authors.map(a => a._id)))
  console.log(authorsIds)
  let stat = [];
  for (let i = 0; i < authorsIds.length; i++) {
    let id = authorsIds[i]
    if (stat.some(s => String(s.author) == String(id))) continue;

    stat.push({
      score: authorsIds.filter(s => String(s) == String(id)).length,
      author: id
    })
  }

  stat = stat.sort((a, b) => b.score - a.score).slice(0, count > stat.length ? count - 1 : stat.length - 1)

  let authors = await AuthorModel.find({ _id: stat.map(s => new ObjectId(s.author)) })

  console.log(stat)
  authors = authors.sort((a,b) => 
    stat.find(i => String(i.author) == String(b._id)).score - stat.find(i => String(i.author) == String(a._id)).score)
  res.json(authors)
})

export default router

