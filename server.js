require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err);
    else console.log('Database is connected!');
})

app.get('/', (req, res, next) => res.send("Hello World!"))

app.listen(port, () => console.log(`This server is running on port ${port}`));