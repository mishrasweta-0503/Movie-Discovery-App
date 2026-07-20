// 1. Try to import local config. If it's not there (on Netlify), handle the error gracefully
let tmdbKey;

try {
  const config = await import('../config.js');
  tmdbKey = config.tmdbKey;
} catch (e) {
  // If config.js is missing, look for Netlify's environment variable
  tmdbKey = typeof process !== 'undefined' ? process.env.TMDB_KEY : undefined;
}

const tmdbBaseUrl = 'https://api.themoviedb.org/3';

//getGenres function will extract the genres list

const getGenres = async() => {
  try {
    const genrePath = '/genre/movie/list';
    const queryParam = `?api_key=${tmdbKey}`;
    const finalPath = `${tmdbBaseUrl}${genrePath}${queryParam}`;
    const response = await fetch(finalPath);
    if(response.ok){
      const jsonResponse = await response.json();
      populateGenres(jsonResponse.genres);
    }
  } catch (error) {
    console.log(error);
  }
}

getGenres();

function getSelectedGenre(){
  const genreDropdown = document.getElementById('genreSelect');
  const genreButton = document.getElementById('play');
  genreButton.addEventListener('click', () => {
    const dropdownvalue = genreDropdown.value;
    getMoviesByGenre(dropdownvalue);
  })
}

getSelectedGenre();

//populateGenres function will populate the genres on to the dropdown

function populateGenres(genreList){
  const genreSelect = document.getElementById('genreSelect');
  genreSelect.innerHTML = "";
  genreList.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
}

const getMoviesByGenre = async(genreId) => {
  try {
    const moviePath = '/discover/movie';
    const queryParam = `?api_key=${tmdbKey}`;
    const tmdbParam = `&with_genres=${genreId}`;
    const finalPath = `${tmdbBaseUrl}${moviePath}${queryParam}${tmdbParam}`;
    const response = await fetch(finalPath);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse.results);
      displayMovie(jsonResponse.results)
    }
  } catch (error) {
    
  }
}

function displayMovie(moviesList){
  const movieWall = document.getElementById('genrelist');
  movieWall.innerHTML = "";
  const posterPath = 'https://image.tmdb.org/t/p/w500';
  moviesList.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    const title = document.createElement('h2');
    title.textContent = movie.title;
    const description = document.createElement('p');
    description.textContent = movie.overview;
    // 6. Create the Poster image element
    const poster = document.createElement('img');
    // Ensure the poster path actually exists before setting it
    if (movie.poster_path) {
      poster.src = `${posterPath}${movie.poster_path}`;
    } else {
      poster.src = 'https://via.placeholder.com/500x750?text=No+Poster+Available'; // Fallback if no image exists
    }
    poster.alt = `${movie.title} Poster`;
    poster.style.width = '200px'; // Give it a base size so it fits neatly
    // 7. Glue the Title, Poster, and Description inside our card
    movieCard.appendChild(title);
    movieCard.appendChild(poster);
    movieCard.appendChild(description);

    // 8. Put the finished movie card on our main wall container
    movieWall.appendChild(movieCard);
  })
}