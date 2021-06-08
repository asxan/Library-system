import express from 'express';
import mongoose from 'mongoose';
import booksRouter from './routers/booksRouters.js';
import usersRouter from './routers/usersRouters.js';
import orderRouter from './routers/orderRouters.js';
import statsRouter from './routers/statsRouter.js';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/library';
const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const app = express();

app.use(cors());
app.use(booksRouter);
app.use(usersRouter);
app.use(orderRouter);
app.use(statsRouter);

try {
  console.log('\n\x1b[32m[app] starting...');

  await mongoose.connect(DB_URL, DB_OPTIONS);

  console.log('\x1b[32m[app] app has been to db connected\x1b[0m');

  app.listen(PORT, () => console.log("\x1b[32m[app] listening has been started\x1b[0m"));
} catch (e) {
  console.log("\x1b[31m[app] " + e + "\x1b[0m");
}
