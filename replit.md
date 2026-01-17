# Shindo's Hub - Game Portal

## Overview
A modern game portal website that hosts browser-based games. Features a sleek dark UI with Top Played tracking, searchable game library, recently played history, and mobile-friendly responsive design.

## Features
- **Top Played**: Tracks actual play counts per game using localStorage, displays top 6 most played with rank badges
- **Game Library**: 24+ browser-based games including Cuphead, VEX series, Minecraft, Sonic games, racing, puzzle, and rhythm games
- **Search**: Real-time search filtering by game name, description, or tags
- **Recently Played**: Tracks last 8 games played using localStorage
- **Mobile-Friendly**: Responsive design with touch-friendly UI and hamburger menu
- **Game Descriptions**: Each game includes title, description, and category tags
- **Settings Panel**: About:blank cloaking, UI version switcher, menu music toggle, FPS counter, WebGL switch, mobile UI toggle

## Project Structure
```
/
├── index.html              # Main homepage
├── main.css                # Modern responsive styles
├── script.js               # Search, play tracking, settings, mobile detection
├── server.js               # Express server on port 5000
├── about.html              # About & Credits page
├── audio/                  # Audio files (menu music)
├── images/                 # Game thumbnails and logo
└── games/                  # Game files (HTML5 games)
    ├── cuphead/
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
    ├── minecraft-1-8-8/
    ├── minecraft-1-12-2/
    ├── minecraft-1-21-4/
    ├── 1v1lol/
    ├── 2048/
    ├── sonic-r/
    ├── sonic-colors/
    └── sonic-classic-collection/
```

## Running the Project
- Development: Uses Express server on port 5000
- Command: `node server.js`

## Deployment
Configured as autoscale deployment running `node server.js`.

## Recent Changes
- January 17, 2026: Major UI modernization
  - Removed YouTube feature completely
  - Added Cuphead game with logo
  - Changed "Popular" to "Top Played" with actual play count tracking
  - Modernized UI with purple/indigo accent colors
  - Updated to Inter font family
  - Added rank badges (gold/silver/bronze) for top 3 games
  - Updated Minecraft games to use new webp logo
  - Added 1v1.LOL and 2048 to game library

## User Preferences
- Dark theme (deep navy/purple tones)
- Games organized in grid layout
- Touch-friendly on mobile devices
- Play count tracking for popularity

## Tech Stack
- HTML5/CSS3/JavaScript (Vanilla)
- Express.js server
- localStorage for play tracking
