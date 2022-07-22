import React from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";

const Header = ({
  genres,
  setMovies,
  filteredList,
  inputText,
  setInputText,
  isSearching,
  setIsSearching,
}) => {
  const filterHandler = (category) => {
    const filteredMovie = filteredList.filter((movie) => {
      return movie.genre_ids.includes(category);
    });
    setMovies(filteredMovie);
  };

  const showAllHandler = () => {
    setIsSearching(true);
    setMovies(filteredList);
    setIsSearching(false);
  };

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") {
      return;
    }
    setIsSearching(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=d0bb90ba32c914321e4dc786821b51e3&query=${inputText}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
    setInputText("");
  };

  return (
    <header>
      <div className="title-container">
        <h1>My Movie Application</h1>
      </div>

      <form className="form" onSubmit={searchMovies}>
        <input
          type="text"
          className="input"
          placeholder="search here..."
          onChange={inputHandler}
          value={inputText}
        />
        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
      </form>

      {isSearching && (
        <button className="btn-1" onClick={showAllHandler}>
          Go back
        </button>
      )}

      {!isSearching && (
        <div className="categoryBtn-container">
          <button className="btn" onClick={showAllHandler}>
            All
          </button>
          <button className="btn" onClick={() => filterHandler(genres[0].id)}>
            Action
          </button>
          <button className="btn" onClick={() => filterHandler(genres[2].id)}>
            Animation
          </button>
          <button className="btn" onClick={() => filterHandler(genres[1].id)}>
            Adventure
          </button>
          <button className="btn" onClick={() => filterHandler(genres[3].id)}>
            Comedy
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
