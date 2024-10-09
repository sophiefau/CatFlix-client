import React from "react";
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img
        src={movie.ImgPath}
        alt={movie.Title}
      />
      {movie.Title}
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
