const express = require('express');
const app = express();
const port = 3000;

const fetch = require('node-fetch');

require('dotenv').config();
const API_KEY = process.env.API_KEY;
const SHARED_SECRET = process.env.SHARED_SECRET;


app.get('/search', async (req, res) => {
    const { song } = req.query;
    if (!song) {
        return res.status(400).json({ error: 'Missing song query. '});
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(song)}&api_key=${API_KEY}&format=json&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || !data.results.trackmatches || !data.results.trackmatches.track) {
            console.error('No tracks found');
            return res.status(404).json({ error: 'No tracks found' });
        }
        const trackResults = data.results.trackmatches.track;
        
        const tracks = trackResults.map((track) => ({
            name: track.name,
            artist: track.artist,
            url: track.url,
            image: track.image,
        }));

        return res.json(tracks);
    } catch (error) {
        console.error('Error fetching from Last.fm API:', error);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
});


app.get('/', (req, res) => {
    res.send('Test');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});