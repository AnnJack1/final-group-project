// API setup 
const API_KEY = "db1144ba74eb71f6a6761ae20bb58664";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


// creates movie cards and puts them on the page
function displayMovies(movies, containerId = null) {
    let container = containerId
        ? document.getElementById(containerId)
        : document.getElementById("main") || document.querySelector(".container .row");

    if (!container) return;

    container.innerHTML = "";

    movies.forEach(movie => {
        const col = document.createElement("div");
        col.classList.add("col-md-3");

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${IMG_URL + movie.poster_path}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="text-warning">⭐ ${movie.vote_average.toFixed(1)}</p>
                </div>
            </div>
        `;

        col.onclick = () => {
            window.location.href = `Details.html?id=${movie.id}`;
        };

        container.appendChild(col);
    });
}


// loads top rated movies
async function loadTopRated() {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await res.json();

    displayMovies(data.results, "main");
}


// loads editor picks //
async function loadEditorPicks() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();

    displayMovies(data.results);
}


const path = window.location.pathname;

if (path.includes("TopRated.html")) loadTopRated();

// runs editor picks //
if (path.includes("EditorPick.html")) loadEditorPicks();




// loads details page of movie when clicked on
async function loadDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const movie = await res.json();

    const container = document.getElementById("main");
    if (!container) return;

    container.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${IMG_URL + movie.poster_path}" class="img-fluid">
            </div>
            <div class="col-md-8 d-flex align-items-center">
                <div>
                    <h2>${movie.title}</h2>

                    <!-- fav button -->
                    <button id="favBtn" class="btn btn-dark btn-sm rounded-pill px-3 py-2 mb-3"
                        onclick="handleFavoriteClick(${movie.id})"> 
                          Add to Favorites
                    </button>

                    <p class="text-warning">⭐ ${movie.vote_average.toFixed(1)}</p>
                    <p>${movie.overview}</p>
                </div>
            </div>
        </div>
    `;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.find(f => f.id === movie.id);

    if (exists) {
        const btn = document.getElementById("favBtn");
        if (btn) {
            btn.innerText = "Remove from Favorites"; 
            btn.classList.remove("btn-dark");
            btn.classList.add("btn-danger"); 
        }
    }
}

if (path.includes("Details.html")) loadDetails();


// add/remove fav function when clicked
function handleFavoriteClick(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find(f => f.id === id);

    if (exists) {
        favorites = favorites.filter(f => f.id !== id);
    } else {
        const title = document.querySelector("h2").innerText;
        const poster = document.querySelector("img").getAttribute("src");
        const ratingText = document.querySelector(".text-warning").innerText;
        const vote = parseFloat(ratingText.replace("⭐", ""));

        favorites.push({
            id: id,
            title: title,
            poster_path: poster.replace(IMG_URL, ""),
            vote_average: vote
        });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    location.reload();
}

// loads favorite page and displays message if no faovrites, otherwise shows fav movies
if (path.includes("Favorites.html")) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const container = document.getElementById("main");

    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="text-center mt-5">
                <h3>No favorites yet. </h3>
                <p>Start adding movies to build your collection!</p>
            </div>
        `;
    } else {
        displayMovies(favorites, "main");
    }
}


// heart icon on toprated and editor picks, shows filled heart if in favorites, otherwise empty heart? need to add this to displayMovies
//function addFavoriteIcons() {
//    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
 //   const cards = document.querySelectorAll(".card");