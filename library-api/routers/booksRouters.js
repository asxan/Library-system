import express from 'express';
import bookModel from '../models/book.js';
import mongoose from 'mongoose';
import genreModel from '../models/genre.js';
import authorModel from '../models/author.js';

const router = express.Router();
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
    books = await bookModel.find();
  } else {
    books = await bookModel.find({ genres: new ObjectId(genre) });
  }

  res.json(books);
});

router.get('/api/books/:id', async (req, res) => {
  log(req);
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.sendStatus(404);
    return
  }
  let book = await bookModel.findById(new ObjectId(id));

  if (!book) {
    res.sendStatus(404);
    return
  }

  res.json(book);
});

router.get('/api/genres', async (req, res) => {
  log(req);
  let genres = await genreModel.find();
  res.json(genres);
});

router.get('/api/authors', async (req, res) => {
  log(req);
  let authors = await authorModel.find();
  res.json(authors);
});

router.post('/api/authors', async (req, res) => {
  log(req);
  let authors = new authorModel(req.body);

  if (!authors.fullName) {
    res.status(400).send("Validation error");
    return
  }

  authorModel.create(authors).then(
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
  let book = new bookModel(req.body);
  console.log(book);
  if (!book.name && 
     !book.publishingHouse &&
     !book.publicationYear &&
     !book.authors &&
     !book.genres &&
     !book.description) {
    res.status(400).send("Validation error");
    return
  }

  bookModel.create(book).then(
    () => res.sendStatus(200)
  ).catch(
    (error) => {
      res.status(400).send("Incorect data");
    }
  );

})

router.post('/api/editions', async (req, res) => {
  log(req);
  let bookEdition = req.body;
  console.log(bookEdition);

  if (!bookEdition.bookId &&
     !bookEdition.language &&
     !bookEdition.cover &&
     !bookEdition.pablishedYear &&
     !bookEdition.printedType &&
     !bookEdition.pages) {
    res.status(400).send("Validation error");
    return
  }

  var book = await bookModel.findById(new ObjectId(bookEdition.bookId))

  book.booksEditions.push(bookEdition);
  await book.save();
})

export default router