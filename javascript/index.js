
//api key: 6694421b

// http://www.omdbapi.com/?apikey=6694421b


const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchbar-input");
let movies = [];

searchBtn.addEventListener("click", handleSearchClick);

async function handleSearchClick(e) {
    e.preventDefault();


    const res = await fetch(`https://www.omdbapi.com/?apikey=6694421b&s=${searchInput.value}&type=movie`);
    const data = await res.json();

    if (data.Response === "False") {
        document.getElementById("movie-container").innerHTML = `
            <h2>Unable to find what you’re looking for. Please try another search.</h2>
        `;
    } else {
        const movieArr = data.Search;
        movies = await getMovies(movieArr);
        renderMovies(movies);
        addMovieToWatchList();
        searchInput.value = ""; 
        console.log(data);
    }
}


async function getMovies(movieArr) {
    const moviePromises = movieArr.map(async (movie) => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=6694421b&i=${movie.imdbID}`
        );
        const data = await res.json();
        const { Title, Runtime, Genre, Plot, Poster, imdbID, imdbRating } = data;

        return {
          id: imdbID,
          title: Title,
          duration: Runtime,
          genre: Genre,
          plot: Plot,
          poster: Poster,
          rating: imdbRating,
        };
    });
    
    return Promise.all(moviePromises);
}


function renderMovies(movies) {
    const movieContainer = document.getElementById("movie-container");


    movieContainer.innerHTML = movies.map(movie => {
        const {
          id,
          title,
          duration,
          genre,
          plot,
          rating,
          poster
        } = movie;

        const posterUrl = poster !== "N/A" ? poster : "poster-placeholder.jpg";

        return `
            <div class="movie">
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${title}" class="movie-poster-img">
                </div>
                <div class="movie-data">

                <div class="movie-data-title"> 
                    <h3>${title}</h3>
                    <p>⭐ ${rating}</p>
                </div>

                <div class="movie-data-genre">
                    <p>${duration}</p>
                    <p class="genre">${genre}</p>
                    <div class="add-movie-container"> 
                        <button id="${id}" data-add-movie-id="${id}" class="add-movie-btn"> + Watchlist</button>
                    </div>
                   
                </div>

                <div class="movie-data-plot">
                    <p>${plot}</p>
                </div>  
                </div>
            </div>
        `;
    }).join('');
}

function addMovieToWatchList() {
    document.addEventListener("click", (e) => {
      const movieId = e.target.dataset.addMovieId;
  
      if (movieId) {
        if (localStorage.getItem(`movie-${movieId}`)) {
          alert("Movie already in your Watchlist.");
        } else {
          const movie = movies.find((m) => m.id == movieId);
          localStorage.setItem(`movie-${movieId}`, JSON.stringify(movie));
          const changeBtn = document.getElementById(
            `${movieId}`
          ).innerHTML = `<p class="confirm-add" data-add-movie-id="${movieId}">Added</p>`;

        }
      }
    });
  }



