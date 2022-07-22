import React, { useState } from "react";
import "./Movies.css";

const Movies = ({ title, description, release, imageURL }) => {
  const [readmore, setReadmore] = useState(false);
  return (
    <div className="movie-card">
      <div className="movie-description">
        <img
          src={`https://image.tmdb.org/t/p/w500/${imageURL}`}
          alt="movie-images"
        />
        <p className="name">{title}</p>
        <p className="show" onClick={() => setReadmore(!readmore)}>
          {readmore ? "Show less..." : "Read more..."}
        </p>
        {readmore && <p className="desc">{description}</p>}

        <p className="release">{release}</p>
      </div>
      <button className="viewmore-btn">View More</button>
    </div>
  );
};

export default Movies;
