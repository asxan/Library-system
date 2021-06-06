import express from 'express'
import mongoose from 'mongoose'
import booksRouter from './routers/booksRouters.js'
import usersRouter from './routers/usersRouters.js'
import orderRouter from './routers/orderRouters.js'
import statsRouter from './routers/statsRouter.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000
const app = express();
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

app.use(cors());
app.use(booksRouter);
app.use(usersRouter);
app.use(orderRouter);
app.use(statsRouter);

async function start() {
  try {
    console.log('\n\x1b[32m[app] starting...');
    await mongoose.connect('mongodb://localhost:27017/library',dbOptions);
    console.log('\x1b[32m[app] app has been to db connected\x1b[0m');
    app.listen(PORT, () => {
      console.log("\x1b[32m[app] listening has been started\x1b[0m");
    });
  } catch (e) {
    console.log("\x1b[31m[app] " + e + "\x1b[0m");
  }
}
start()
