#!/bin/bash

# Check for icons
echo "Checking for icons..."
if [ -f "astroweb/public/favicon.svg" ]; then
  echo "Favicon found."
else
  echo "Favicon not found."
fi

# Check for links
echo "Checking for links..."
if grep -q "https://yourusername.github.io/astroweb" README.md; then
  echo "Live demo link found."
else
  echo "Live demo link not found."
fi

# Check deployment status
echo "Checking deployment status..."
if curl -s -o /dev/null -w "%{http_code}" https://yourusername.github.io/astroweb > /dev/null; then
  echo "Project is deployed."
else
  echo "Project is not deployed."
fi