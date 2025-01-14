const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

app.use(cors({
    origin: '*',
}));
app.use(express.json());

app.get('/weather', async (req, res) => {
    try {
        const { q, lat, lon } = req.query;

        let url;
        if (q) {
            // Query by location name
            url = `${BASE_URL}?key=${API_KEY}&q=${q}`;
        } else if (lat && lon) {
            // Query by geographic coordinates
            url = `${BASE_URL}?key=${API_KEY}&q=${lat},${lon}`;
        } else {
            return res.status(400).json({ error: 'Please provide a location (q) or coordinates (lat and lon).' });
        }

        const response = await axios.get(url);
        res.json(response.data); // Send the data to the frontend
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server working properly and running on port ${PORT}...`);
});
