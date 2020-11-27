import React, { useState ,useEffect} from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBox from "./components/SearchBox"
import MovieListHeading from "./components/MovieListHeading";
import AddFavourites from "./components/AddFavourite"
import RemoveFavourites from "./components/RemoveFavourites"

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue,setsearchValue]=useState('');
  const [favourites,setFavourites]=useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ed50e008&`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search){
    setMovies(responseJson.Search);
  }
    
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

useEffect(()=>{
const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'))
  if(movieFavourites){
 setFavourites(movieFavourites);
}
},[])

 const saveToLocalStorage =(items)=>{
localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))

 };
 const addFavouriteMovie = (movie)=>{
   const newFavouriteList=[...favourites,movie];
   setFavourites(newFavouriteList);
   saveToLocalStorage(newFavouriteList);

 }
 
 const removeFavouriteMovie = (movie)=>{
   const newFavouriteList=favourites.filter((favourite)=>
     favourite.imdbID !== movie.imdbID
   )
   setFavourites(newFavouriteList);
   saveToLocalStorage(newFavouriteList);

 }
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies'></MovieListHeading>
        <SearchBox searchValue={searchValue} setsearchValue={setsearchValue} />
      </div>
      <div className="row ">
        <MovieList movies={movies} 
        favouriteComponent={AddFavourites}
        handleFavouritesClick={addFavouriteMovie}
        />   
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Favourites'></MovieListHeading>
      </div>
      <div className="row ">
        <MovieList movies={favourites} 
        favouriteComponent={RemoveFavourites}
        handleFavouritesClick={removeFavouriteMovie}
        
        
        />   
      </div>
    </div>
  );
};

export default App;
