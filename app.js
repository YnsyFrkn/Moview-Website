const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=7bb45af0ffc56a15cce0e2e53f3e23a2&language=en-US&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=7bb45af0ffc56a15cce0e2e53f3e23a2&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.results);
  showMovies(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average, release_date } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}"
    alt="${title}" />
<div class="movie-info">
    <h3>${title}</h3>
    <span class=${getClassByRate(vote_average)}>${vote_average}</span>
    <small>${release_date}</small>
</div>
<div class="overview">
    <h3>${title} <small>overview</small></h3>
    <p>${overview}</p>
</div>
    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
