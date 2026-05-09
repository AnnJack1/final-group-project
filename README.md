# Final Group Project

## Overview
Final group project for SDEV257: a movie discovery app built with Expo and React Native. The mobile app consumes The Movie Database (TMDB) API to display top-rated films, trending titles, latest releases, editor's picks, and searchable movie results.

## Group Members
- Zane Ketcham
- Emma Jackson
- Elisabeth Hoyt
- Ashlin Holmes

## Features
- Home feed with sections for Top-Rated, Trending, Latest Releases, and Editor's Picks
- Dedicated pages for Top Rated, Trending, Latest, and Editor's Picks
- Search screen with live movie search powered by TMDB
- Movie details screen with overview, rating, release date, runtime, and external TMDB link
- Responsive layout for mobile and web using Expo Router
- Reusable components for navigation, movie cards, and movie sections

## Tech Stack
- Expo
- React Native
- Expo Router
- TMDB API
- React Navigation
- ESLint

## Project Structure
- `mobile/` — main Expo mobile app
  - `app/` — route-based application screens and API utilities
  - `components/` — reusable UI components (`Navbar`, `MovieSection`, `MovieCard`)
  - `package.json` — app dependencies and run scripts
- `frontend/` — browser-side assets and script
- `assets/` — static assets for the project

## Getting Started
### Prerequisites
- Node.js
- npm
- Expo CLI (optional, but useful for running the project)

### Install dependencies
```bash
cd mobile
npm install
```

### Run the app
```bash
npm run start
```

Then select one of the available targets:
- `android`
- `ios`
- `web`

Alternatively, use the direct npm scripts:
```bash
npm run android
npm run ios
npm run web
```

## Notes
- The app uses the TMDB API key stored in `mobile/app/api.js`.
- Search results are fetched from TMDB and displayed in a card layout.
- The details screen opens the TMDB page for the selected movie when requested.
- Added `mobile/App.js` so the app can be used as an Expo Snack entrypoint with `import 'expo-router/entry';`.
