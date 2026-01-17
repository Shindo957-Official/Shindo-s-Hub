# Blazer - Game Portal

## Overview
A static HTML/CSS/JavaScript game portal website that hosts various browser games. The site features a clean, dark-themed interface with a "Popular" games section and a searchable game library.

## Project Structure
```
/
├── index.html          # Main homepage
├── main.css            # Styles
├── script.js           # JavaScript functionality
├── images/             # Game thumbnails and logo
└── games/              # Game files (HTML5 games)
    ├── bob-the-robber-2/
    ├── vex3/
    ├── vex4/
    ├── vex5/
    ├── vex6/
    ├── vex7/
    ├── drive-mad/
    ├── moto-x3m/
    ├── motox3m2/
    ├── 1v1lol/
    └── ...
```

## Running the Project
- Development: Uses `http-server` to serve static files on port 5000
- Command: `npx http-server -p 5000 -a 0.0.0.0 -c-1`

## Deployment
Configured as a static site deployment serving the root directory.

## Recent Changes
- January 17, 2026: Initial Replit environment setup
  - Added http-server for development
  - Configured workflow for port 5000
  - Set up static deployment
