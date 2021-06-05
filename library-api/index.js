import express from 'express'
import mongoose from 'mongoose'
import booksRouter from './routers/booksRouters.js'
import usersRouter from './routers/usersRouters.js'
import orderRouter from './routers/orderRouters.js'
import statsRouter from './routers/statsRouter.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000
const app = express();

app.use(cors());


app.use(booksRouter);
app.use(usersRouter);
app.use(orderRouter);
app.use(statsRouter);

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/library',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    console.log('\n');
    console.log('\x1b[32mDB has been connected...\x1b[0m');
    
    app.listen(PORT, () => {
      console.log("\x1b[32mAPI has been started...\x1b[0m");
    });
  } catch (e) {
    console.log(e);
  }
}
start()
