const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

const fetch = require('node-fetch');

require('dotenv').config();
const API_KEY = process.env.API_KEY;


app.get('/tracks', async (req, res) => {
    const { search } = req.query;
    if (!search) {
        return res.status(400).json({ error: 'Missing search query. '});
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(search)}&api_key=${API_KEY}&format=json&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || !data.results.trackmatches ||!data.results.trackmatches.track) {
            console.error('No tracks found');
            return res.status(404).json({ error: 'No tracks found' });
        }

        const tracks = data.results.trackmatches.track.map((track) => ({
            name: track.name,
            artist: track.artist,
        }));

        return res.json(tracks);
    } catch (error) {
        console.error('Error fetching from Last.fm API:', error);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
});


app.get('/tracks/recommendations', async (req, res) => {
    const { track, artist } = req.query;
    if (!track || !artist) {
        return res.status(400).json({ error: 'Missing track or artist query.' });
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=${encodeURIComponent(API_KEY)}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.similartracks || !data.similartracks.track || data.similartracks.track.length === 0) {
            console.error('No recommendations found');
            return res.status(404).json({ error: 'No recommendations found.' });
        }

        const recommendations = data.similartracks.track.map((track) => ({
            name: track.name,
            artist: track.artist.name,
            image: track.image,
        }));
        
        return res.json(recommendations);
    } catch (error) {
        console.error('Error fetching from Last.fm API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/', (req, res) => {
    res.send('Test');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});