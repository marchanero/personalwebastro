import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SERPAPI_KEY = process.env.SERPAPI_KEY;

if (!SERPAPI_KEY) {
  console.error('SERPAPI_KEY is not set');
  process.exit(1);
}

app.get('/api/publications', async (req, res) => {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        api_key: SERPAPI_KEY,
        engine: 'google_scholar',
        q: 'your search query here', // Replace with the actual search query
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.status(404).json({ error: 'Endpoint not available' });
});

app.get('/api/health', (req, res) => {
  const currentTime = new Date().toISOString();
  const latitude = 40.416775; // Example latitude for Madrid
  res.status(200).json({ status: 'ok', time: currentTime, latitude });
});


app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});