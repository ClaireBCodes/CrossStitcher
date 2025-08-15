#!/bin/bash

# Script to test GitHub Pages deployment locally

echo "Building Storybook for GitHub Pages..."
npm run build-storybook

echo ""
echo "Starting local server..."
echo "Your Storybook will be available at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

# Use Python's built-in HTTP server
cd storybook-static
python3 -m http.server 8080