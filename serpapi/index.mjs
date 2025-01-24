import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Endpoint para búsquedas en Google Scholar
app.get('/api/scholar', async (req, res) => {
  try {
    const { author } = req.query;
    if (!author) {
      return res.status(400).json({ error: 'Author parameter is required' });
    }

    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'SERPAPI_KEY not configured' });
    }

    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${author}&api_key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching from SerpAPI:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`SerpAPI service running on port ${port}`);
});