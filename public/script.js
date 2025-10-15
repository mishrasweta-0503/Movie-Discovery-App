const tmdbBaseUrl = 'https://api.themoviedb.org/3'; //base url for all API requests to the movie database(TMDB);
const tmdbKey = '899c5e9c66472ff147b7021812d68e53'; //this key identifies you the TMDB

//next step is to retreive the endpoint which will give us the genres list

//getGenres function will extract the genres list

const getGenres = async() => {
    const genreslist = []
    const genreRequestEndpoint = "/genre/movie/list";
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
          const jsonResponse = await response.json();
          const genres = jsonResponse.genres;
          const genreContainer = document.getElementById("genreContainer");
          for(const genre of genres){
            genreslist.push(genre.name)
          }
          populateGenres(genres)
        }
    } catch(error){
        console.log(error)
    }
}

getGenres();

//populateGenres function will populate the genres list in the dropdown

const populateGenres = async (genres) => {
    const genreSelect = document.getElementById("genreSelect");
    for(let i = 0; i < genres.length; i++){
       const genre = genres[i];
       var option = document.createElement("option");
       option.value = genre.id;
       option.text = genre.name;
       if(i === 0){
        option.selected = true;
       }
       genreSelect.add(option);
    }
    console.log("getGenreId function is running!");
    getGenreId()
    }

const getMoviesByGenre = async (genreId) => {
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${genreId}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try{
        const response = await fetch(urlToFetch)
        if(response.ok){
          const jsonResponse = await response.json();
          //console.log(jsonResponse)
          const movies = jsonResponse.results;
          displayMovies(movies)
        }
      } catch(error){
        console.log(error)
      }
}

const displayMovies = async(movies) => {
    const displaymovie = document.getElementById("genreContainer");
    displaymovie.innerHTML = ""; //this ensures that the container is empty each time before new movies are shown
    for(let i = 0; i < movies.length; i++){
        const moviedetails = document.createElement('div');
        moviedetails.classList.add("movie-card");
        moviedetails.textContent = movies[i].title;
        displaymovie.appendChild(moviedetails);
     }
}

const getGenreId = () => {
    const genreSelect = document.getElementById("genreSelect");
    document.getElementById("play").addEventListener('click',function(){
        console.log("Play button clicked! Selected genre ID:", genreSelect.value)
        getMoviesByGenre(genreSelect.value)
    })
}