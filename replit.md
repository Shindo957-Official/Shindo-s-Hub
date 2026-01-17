# Shindo's Hub - Game Portal

## Overview
A modern game portal website that hosts browser-based games. Features a sleek dark UI with Top Played tracking, searchable game library, recently played history, and mobile-friendly responsive design. Made by Shindo Productions.

## Features
- **Loading Screen**: Animated loading screen with progress bar and "Made by Shindo Productions" branding
- **Top Played**: Tracks actual play counts per game using localStorage, displays top 6 most played with rank badges
- **Game Library**: 24+ browser-based games including Cuphead, VEX series, Minecraft, Sonic games, racing, puzzle, and rhythm games
- **Game Modal**: Games open in fullscreen-capable modal with controls
- **Fullscreen Mode**: One-click fullscreen button when playing games
- **Game Ratings**: 5-star rating system for logged-in users, shows average ratings
- **User Profiles**: Custom avatar selection from game thumbnails
- **Account System**: Login/register with admin (Shindo957) and member accounts
- **Admin Controls**: Reset play counts, view users with join dates, delete accounts
- **Search**: Real-time search filtering by game name, description, or tags
- **Recently Played**: Tracks last 8 games played using localStorage
- **Mobile-Friendly**: Responsive design with touch-friendly UI and hamburger menu
- **Game Descriptions**: Each game includes title, description, and category tags
- **Settings Panel**: About:blank cloaking, UI version switcher (Old/0.2/0.5/0.75), menu music toggle, FPS counter, WebGL switch, mobile UI toggle
- **UI Versions**: Old (red retro), 0.2 (cyan minimal), 0.5 (indigo), 0.75 (violet modern)

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
- January 17, 2026: Major feature update
  - Added loading screen with animated progress bar and "Made by Shindo Productions" credit
  - Games now open in a modal with fullscreen button
  - Added 5-star game rating system (requires login)
  - Added user profile avatars (click to choose from game thumbnails)
  - Added UI version 0.75 with violet/purple modern styling
  - Made all UI versions (Old/0.2/0.5/0.75) functional with distinct themes
  - Admin controls: reset play counts, view/delete users
  - Account system with login/register functionality
  - Fixed password fields with proper form elements

## User Preferences
- Dark theme (deep navy/purple tones)
- Games organized in grid layout
- Touch-friendly on mobile devices
- Play count tracking for popularity

## Tech Stack
- HTML5/CSS3/JavaScript (Vanilla)
- Express.js server
- localStorage for play tracking
