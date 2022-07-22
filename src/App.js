import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Movies from "./Movies";

function App() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=d0bb90ba32c914321e4dc786821b51e3";
  const API_GENRES =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d0bb90ba32c914321e4dc786821b51e3&language=en-US";

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [inputText, setInputText] = useState("");
 const [isSearching, setIsSearching] =useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
        setFilteredList(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    const fetchGenres = async () => {
      try {
        const response = await fetch(API_GENRES);
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGenres();

  }, []);

 
  return (
    <Fragment>
      <Header
        genres={genres}
        setGenres={setGenres}
        setMovies={setMovies}
        movies={movies}
        filteredList={filteredList}
        inputText={inputText}
        setInputText={setInputText}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
      <div className="movies-container">
        {movies.map((movie) => {
          const { original_title, overview, release_date, poster_path, id } =
            movie;
          return (
            <Movies
              title={original_title}
              description={overview}
              release={release_date}
              imageURL={poster_path}
              id={id}
              key={id}
            />
          );
        })}
        <Movies />
      </div>
    </Fragment>
  );
}

export default App;
