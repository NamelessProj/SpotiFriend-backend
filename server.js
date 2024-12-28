const express = require('express');
const {errorHandler} = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ROUTES

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to DB: ${err}`);
});