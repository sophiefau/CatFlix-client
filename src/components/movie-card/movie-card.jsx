import React from "react";
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 bg-dark text-white" onClick={() => onMovieClick(movie)}>
      <Card.Img className="w-100" variant="top" src={movie.Img} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.Title}</Card.Title>
          <div className="mt-auto">
          < a href="#" variant="link" className="details-btn"> See details </a>
          </div>
        </Card.Body>
    </Card>
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
