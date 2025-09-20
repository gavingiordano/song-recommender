const express = require('express');
const app = express();
const port = 3000;

const fetch = require('node-fetch');

require('dotenv').config();
const API_KEY = process.env.API_KEY;
const SHARED_SECRET = process.env.SHARED_SECRET;


app.get('/', (req, res) => {
    res.send('Test');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});