//require('dotenv').config();

const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());

app.use(
  cors({
    // optionsSuccessStatus: 200,
    // allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true,
    origin: [process.env.FRONTEND_URL]
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const start = () => {
    app.listen(PORT, () => {
        console.log('Running on localhost :' + PORT );
    });
};

module.exports = { start };