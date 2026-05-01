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
                    <p class="text-warning">⭐ ${movie.vote_average.toFixed(1)}</p>
                    <p>${movie.overview}</p>
                </div>
            </div>
        </div>
    `;
}

if (path.includes("Details.html")) loadDetails();