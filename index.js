const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT
const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL


app.use(cors({
    origin:'*',
}))
app.use(express.json())

app.get('/weather', async (req, res) => {
    try {
      const location = req.query.q;
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${location}&aqi=no`);
      res.json(response.data); // Send the data to the frontend
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch weather data' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server working properly and running on port ${PORT}...`)
})