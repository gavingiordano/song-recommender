const express = require('express');
const app = express();
const port = 3000;

const fetch = require('node-fetch');

require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


const getToken = async () => {
    try {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials'
            }),
        });

        const data = await result.json();
        if (!data.access_token) {
            throw new Error('No access token received from Spotify API');
        }
        return data.access_token

        // !! tokens expire after one hour !!

    } catch(error) {
        throw new Error(`Error fetching access token from Spotify API: ${error.message}`);
    }
};


app.get('/', (req, res) => {
    res.send('Test');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});