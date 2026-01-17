# Shindo's Hub - Game Portal

## Overview
A static HTML/CSS/JavaScript game portal website that hosts various browser games. The site features a modern, dark-themed interface with a "Popular" games section, searchable game library, recently played tracking, and mobile-friendly responsive design.

## Features
- **Game Library**: 16+ browser-based games including platformers, racing, puzzle, and rhythm games
- **Search**: Real-time search filtering by game name, description, or tags
- **Recently Played**: Tracks last 8 games played using localStorage
- **Mobile-Friendly**: Responsive design with touch-friendly UI and mobile menu
- **Game Descriptions**: Each game includes title, description, and category tags
- **Loading Indicators**: Progress bars (0-100%) on game pages during load
- **WebGL Detection**: Detects device capability for optimal game rendering

## Project Structure
```
/
├── index.html              # Main homepage
├── main.css                # Responsive styles
├── script.js               # Search, recently played, mobile detection
├── images/                 # Game thumbnails and logo
└── games/                  # Game files (HTML5 games)
    ├── bob-the-robber-2/
    ├── vex3/ - vex7/
    ├── drive-mad/
    ├── moto-x3m/
    ├── motox3m2/
    ├── retro-bowl/
    ├── slope/
    ├── tomb-of-the-mask/
    ├── space-waves/
    ├── fnf-sonic-exe/
    ├── pokemon-red/
    ├── 1v1lol/
    └── 2048/
```

## Running the Project
- Development: Uses Express server with proxy support on port 5000
- Command: `node server.js`
- Proxy: Routes `/proxy/` to Invidious for YouTube access

## Deployment
Configured as autoscale deployment running `node server.js`.

## Recent Changes
- January 17, 2026: Major feature update
  - Added FNF vs Sonic.EXE and Pokemon Red games
  - Added Tomb of the Mask and Space Waves games
  - Implemented working search with filtering
  - Added recently played system with localStorage
  - Created responsive mobile-friendly UI
  - Added game descriptions and category tags
  - Added loading indicators with progress (0-100%)
  - Implemented WebGL/device detection
  - Redesigned game cards with hover effects

## User Preferences
- Dark theme preferred
- Games organized in grid layout
- Touch-friendly on mobile devices
