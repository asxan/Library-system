import express from 'express';
import BookModel from '../models/book.js';
import mongoose from 'mongoose';
import GenreModel from '../models/genre.js';
import AuthorModel from '../models/author.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const log = (req) => console.log("\x1b[33m", req.method, req.url, "\x1b[0m");

router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

router.get('/api/books', async (req, res) => {
  log(req);
  let genre = req.query.genre;
  let searchString = req.query.search ?? '';

  let books;

  let query = {
    $and: [
      {
        $or: [
          { name: { $regex: searchString, $options: "i" } },
          { description: { $regex: searchString, $options: "i" } },
          { 'authors.pseudonym': { $regex: searchString, $options: "i" } }]
      }
    ]
  }

  
  if (!genre) {
    books = await BookModel.find(query);
  } else {
    query.$and.push({ $or: [{ genres: new ObjectId(genre) }] })
    books = await BookModel.find(query);
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
  let book = await BookModel.findById(new ObjectId(id));

  if (!book) {
    res.sendStatus(404);
    return
  }

  res.json(book);
});

router.get('/api/genres', async (req, res) => {
  log(req);
  let genres = await GenreModel.find();
  res.json(genres);
});

router.get('/api/authors', async (req, res) => {
  log(req);
  let authors = await AuthorModel.find();
  res.json(authors);
});

router.post('/api/authors', async (req, res) => {
  log(req);
  let authors = new AuthorModel(req.body);

  if (!authors.fullName) {
    res.status(400).send("Validation error");
    return
  }

  AuthorModel.create(authors).then(
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
  let book = new BookModel(req.body);
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

  BookModel.create(book).then(
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

  var book = await BookModel.findById(new ObjectId(bookEdition.bookId))

  book.booksEditions.push(bookEdition);
  await book.save();
  res.status(200).json()
})

export default router