FINAL GROUP PROJECT
-------------------
Overview
Final group project for SDEV257: a movie discovery app built with Expo and React Native.
The app uses The Movie Database (TMDB) API to display top-rated films, trending titles,
latest releases, editor's picks, and searchable movie results.

Group Members
- Zane Ketcham
- Emma Jackson
- Elisabeth Hoyt Frantz
- Ashlin Holmes

Features
- Home feed with Top Rated, Trending, Latest Releases, and Editor's Picks
- Dedicated pages for each category
- Search screen with live TMDB movie search
- Movie details screen with overview, rating, release date, runtime, and TMDB link
- Responsive layout for mobile and web
- Reusable components for navigation and movie cards

Tech Stack
- Expo
- React Native
- TMDB API
- React Navigation
- ESLint

Project Structure
mobile/        - main Expo mobile app
app/           - route-based screens and API utilities
components/    - reusable UI components
constants/     - TMDB API configuration
assets/        - static assets
package.json   - dependencies and scripts

Getting Started
Prerequisites:
- Node.js
- npm
- Expo CLI (optional)

Install dependencies:
cd mobile
npm install

Run the app:
npm run start

Then choose:
- android
- ios
- web

Or run directly:
npm run android
npm run ios
npm run web

Notes
- TMDB API key is stored in mobile/app/api.js
- Search results are fetched from TMDB and displayed in a card layout
- Details screen links to the movie's TMDB page

Search results are fetched from TMDB and displayed in a card layout.

The details screen links to the movie’s TMDB page.
