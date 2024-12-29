const express = require('express');
const {errorHandler} = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connection to DB
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ROUTES
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/access', require('./routes/accessRoutes'));

app.use(errorHandler);

// Establishing the connection with the DB
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
});

// Handling error with the DB connection
mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to DB: ${err}`);
});