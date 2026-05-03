// ===============================
// TMDB CONFIG
// ===============================
const API_KEY = "db1144ba74eb71f6a6761ae20bb58664";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


// ===============================
// SMART MOVIE RENDERER (AUTO-DETECTS CONTAINER)
// ===============================
function displayMovies(movies, containerId = null) {
    let container = null;

    // 1. If a specific containerId was passed (Home page)
    if (containerId) {
        container = document.getElementById(containerId);
    }

    // 2. If no containerId, try #main (your original pages)
    if (!container) {
        container = document.getElementById("main");
    }

    // 3. If still no container, auto-detect the first .row inside a container
    if (!container) {
        container = document.querySelector(".container .row");
    }

    // 4. If still no container, fallback to ANY .row
    if (!container) {
        container = document.querySelector(".row");
    }

    // If nothing found, stop safely
    if (!container) return;

    container.innerHTML = "";

    movies.forEach(movie => {
        const col = document.createElement("div");
        col.classList.add("col-md-3");

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${IMG_URL + movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">⭐ ${movie.vote_average}</p>
                </div>
            </div>
        `;

        col.onclick = () => {
            window.location.href = `Details.html?id=${movie.id}`;
        };

        container.appendChild(col);
    });
}



// ===============================
// HOME PAGE (Multiple Sections)
// ===============================
async function loadHome() {
    const [topRated, trending, latest, editors] = await Promise.all([
        fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then(r => r.json()),
        fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(r => r.json()),
        fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(r => r.json()),
        fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then(r => r.json())
    ]);

    displayMovies(topRated.results, "home-top-rated");
    displayMovies(trending.results, "home-trending");
    displayMovies(latest.results, "home-latest");
    displayMovies(editors.results, "home-editors");
}




// ===============================
// TRENDING PAGE
// ===============================
async function loadTrending() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    displayMovies(data.results);
}



// ===============================
// TOP RATED PAGE
// ===============================
async function loadTopRated() {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await res.json();

    // Their page uses the FIRST .row inside the container
    const container = document.querySelector(".container .row");
    if (container) container.id = "main";

    displayMovies(data.results, "main");
}




// ===============================
// LATEST RELEASES PAGE
// (Using "now playing" because TMDB "latest" returns only 1 movie)
// ===============================
async function loadLatest() {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    const data = await res.json();
    displayMovies(data.results);
}



// ===============================
// SEARCH PAGE
// ===============================
async function searchMovies() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const query = input.value.trim();
    if (!query) return;

    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    displayMovies(data.results);
}



// ===============================
// DETAILS PAGE
// ===============================
async function loadDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
    const movie = await res.json();

    // Fill existing placeholders (no design changes)
    const title = document.getElementById("title");
    const overview = document.getElementById("overview");
    const poster = document.getElementById("poster");
    const tmdbLink = document.getElementById("tmdbLink");
    const trailerLink = document.getElementById("trailerLink");

    if (title) title.textContent = movie.title;
    if (overview) overview.textContent = movie.overview;
    if (poster) poster.src = IMG_URL + movie.poster_path;
    if (tmdbLink) tmdbLink.href = `https://www.themoviedb.org/movie/${movie.id}`;

    // Trailer (if available)
    if (trailerLink) {
        const trailer = movie.videos.results.find(
            v => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) {
            trailerLink.href = `https://www.youtube.com/watch?v=${trailer.key}`;
        }
    }
}



// ===============================
// PAGE ROUTING (Auto-detect page)
// ===============================
const path = window.location.pathname;

if (path.includes("index.html") || path.endsWith("/")) loadHome();
if (path.includes("Trending.html")) loadTrending();
if (path.includes("TopRated.html")) loadTopRated();
if (path.includes("Latest.html")) loadLatest();
if (path.includes("Details.html")) loadDetails();

// Search page uses button onclick="searchMovies()"
// No pathname check needed
