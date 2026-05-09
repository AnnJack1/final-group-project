Final Group Project
Overview
Final group project for SDEV257: a movie discovery app built with Expo and React Native.
The mobile app consumes The Movie Database (TMDB) API to display:

Top‑rated films

Trending titles

Latest releases

Editor's picks

Searchable movie results

Group Members
Zane Ketcham

Emma Jackson

Elisabeth Hoyt Frantz

Ashlin Holmes

Features
Home feed with sections for Top Rated, Trending, Latest Releases, and Editor’s Picks

Dedicated pages for each category

Search screen with live TMDB movie search

Movie details screen with overview, rating, release date, runtime, and external TMDB link

Responsive layout for mobile and web

Reusable components for navigation, movie cards, and movie sections

Tech Stack
Expo

React Native

Expo Router / React Navigation

TMDB API

ESLint

Project Structure
Code
mobile/        — main Expo mobile app  
app/           — route-based application screens and API utilities  
components/    — reusable UI components (Navbar, MovieSection, MovieCard)  
constants/     — TMDB API config  
assets/        — static assets  
package.json   — dependencies and scripts  
frontend/      — browser-side assets and scripts  
Getting Started
Prerequisites
Node.js

npm

Expo CLI (optional but helpful)

Install dependencies
bash
cd mobile
npm install
Run the app
bash
npm run start
Then choose a target:

android

ios

web

Or run directly:

bash
npm run android
npm run ios
npm run web
Notes
The app uses the TMDB API key stored in mobile/app/api.js.

Search results are fetched from TMDB and displayed in a card layout.

The details screen links to the movie’s TMDB page.
