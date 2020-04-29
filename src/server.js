require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug")

//connect database
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err);
    else console.log('Database is connected!');
})

//require router
const bookRouter = require('./routers/bookRouter');
const userRouter = require('./routers/userRouter');

//create router
app.use('/books', bookRouter);
app.use('/users', userRouter);

app.get('/', (req, res, next) => res.send("Hello World!"))

app.listen(port, () => console.log(`This server is running on port ${port}`));