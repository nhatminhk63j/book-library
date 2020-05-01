require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SECRET_STRING));
app.use(express.static(__dirname + "/public"));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug")

//connect database
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err);
    else console.log('Database is connected!');
})

//require middleware
const userMiddleware = require('./middlewares/userMiddleware');
const sessionMiddleware = require('./middlewares/sessionMiddleware');

//use middleware
app.use(userMiddleware.checkHasUser);
app.use(sessionMiddleware);

//require router
const bookRouter = require('./routers/bookRouter');
const userRouter = require('./routers/userRouter');
const bagRouter = require('./routers/bagRouter');
const transactionRouter = require('./routers/transactionRouter');

const apiRouter = require('./routers/apiRouter');

//use router
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/bag', bagRouter);
app.use('/transactions', transactionRouter);

app.use('/api', apiRouter);

app.get('/', (req, res, next) => res.send("Hello World!"));

app.use((req, res) => {
    res.status(500).render('500.pug');
    console.log(res.status)
})

app.listen(port, () => console.log(`This server is running on port ${port}`));