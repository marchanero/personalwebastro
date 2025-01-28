#!/bin/bash

# Navigate to the Astro project directory and start the development server
cd /home/robert/personalwebastro/astroweb && npm run dev &

# Navigate to the Strapi project directory and start the development server
cd /home/robert/personalwebastro/strapi-cms && npm run develop &

# Navigate to the SerpAPI project directory and start the API server
#cd /home/robert/personalwebastro/serpapi && node index.mjs