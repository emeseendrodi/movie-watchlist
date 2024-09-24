
const movieContainer = document.getElementById('movie-container');

let movies = [];

document.addEventListener('click', handleRemoveBtnClick)

getMoviesFromLS()

function handleRemoveBtnClick(e){
    const movieId = e.target.dataset.removeMovieId
    
    if(movieId){
        localStorage.removeItem(`movie-${movieId}`)
        movies.length = 0
        getMoviesFromLS()
    }
}

function getMoviesFromLS(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith('movie-')) {  
            movies.push(JSON.parse(localStorage.getItem(key))); 
        }
    }
    
    if(movies.length > 0){  
        renderWatchlistMovies(movies)
    }else{
        movieContainer.innerHTML= `
                <h3>Your watchlist is looking a little empty...</h3>
                <div>
                    <i class="fa-solid fa-circle-plus"></i>
                    <a href="index.html">Lets add some movies!</a>
                </div>
                
    `
    }
}


    function renderWatchlistMovies(movies) {
        movieContainer.innerHTML = movies.map(movie => {
            const { id, title, duration, genre, plot, rating, poster } = movie;
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
                            <button id="${id}" data-remove-movie-id="${id}" class="remove-movie-btn"> - Remove </button>
                        </div>
                        <div class="movie-data-plot">
                            <p>${plot}</p>
                        </div>  
                    </div>
                </div>
            `;
        }).join('');
    }
