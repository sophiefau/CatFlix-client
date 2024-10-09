import React from "react";

export const MovieView = ({ movie, similarMovies, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.Img} alt={"Movie poster"} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Cat: </span>
        <span>{movie.Cat.Name}</span> {/* Assuming Cat is an object */}
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span> {/* Assuming Genre is an object */}
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.Year}</span>
      </div>
      <div>
        <span>Synopsis: </span>
        <span>{movie.Synopsis}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};