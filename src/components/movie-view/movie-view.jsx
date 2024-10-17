import React from "react";
import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <div>
        <img src={movie.Img} alt={"Movie poster"}/>
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
        <span>{movie.Cat.Name}</span> 
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span> 
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.Year}</span>
      </div>
      <div>
        <span>Synopsis: </span>
        <span>{movie.Synopsis}</span>
      </div>
      <Button onClick={onBackClick} className="btn-secondray btn-sm" style={{ cursor: "pointer" }}>Back</Button>
    </div>
  );
};