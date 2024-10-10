import React from "react";
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.Img} alt={"Movie poster"} />
      <h2> {movie.Title} </h2>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    Img: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Cat: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      ColorBreed: PropTypes.string,
      Bio: PropTypes.string,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Year: PropTypes.string.isRequired,
    Synopsis: PropTypes.string.isRequired,
    Animation: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
