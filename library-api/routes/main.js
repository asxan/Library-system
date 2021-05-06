import { Router } from 'express';
import booksModel from '../models/books.js';
import mongoose from 'mongoose';
import genresModel from '../models/genres.js';
import authorsModel from '../models/authors.js';
import express from 'express'
import booksWithEditionsModel from '../models/booksWithEditions.js';

const router = Router();
const ObjectId = mongoose.Types.ObjectId;

const log = (req) => console.log("\x1b[33m", req.method, req.url, "\x1b[0m");

router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

router.get('/api/books', async (req, res) => {
  log(req);
  let genre = req.query.genre
  let books;

  if (!genre) {
    books = await booksModel.find();
  } else {
    books = await booksModel.find({ genres: new ObjectId(genre) });
  }

  res.json(books);
});

router.get('/api/books/:id', async (req, res) => {
  log(req);
  let id = req.params.id;
  if (!ObjectId.isValid(id)){
    res.sendStatus(404);
    return
  }
  let book = await booksWithEditionsModel.findById(new ObjectId(id));
  
  if (!book) {
    res.sendStatus(404);
    return
  }

  res.json(book);
});

router.get('/api/genres', async (req, res) => {
  log(req);
  let genres = await genresModel.find();
  res.json(genres);
});

router.get('/api/authors', async (req, res) => {
  log(req);
  let authors = await authorsModel.find();
  res.json(authors);
});

router.post('/api/authors', async (req, res) => {
  log(req);
  let authors = new authorsModel(req.body);

  if (!authors.fullName) {
    res.status(400).send("Validation error");
    return
  }

  authorsModel.create(authors).then(
    () => res.sendStatus(200)
  ).catch(
    (error) => {
      console.log(error);
      res.status(400).send("Incorect data");
    }
  );
});


router.post('/api/books', async (req, res) => {
  log(req);
  let book = new booksModel(req.body);
  console.log(book);
  if (!book.name && !book.publishingHouse && !book.publicationYear && !book.authors && !book.genres && !book.description) {
    res.status(400).send("Validation error");
    return
  }

  booksModel.create(book).then(
    () => res.sendStatus(200)
  ).catch(
    (error) => {
      res.status(400).send("Incorect data");
    }
  );

})

router.post('/api/editions', async (req, res) => {
  log(req);
  let bookEdition = new edition(req.body);
  console.log(bookEdition);
  if (!bookEdition.bookId && !bookEdition.language && !bookEdition.cover && !bookEdition.pablishedYear && !bookEdition.printedType && !bookEdition.pages) {
    res.status(400).send("Validation error");
    return
  }

  edition.create(bookEdition).then(
    () => res.sendStatus(200)
  ).catch(
    (error) => {
      res.status(400).send("Incorect data");
    }
  );

})

export default router