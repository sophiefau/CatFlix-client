import React from "react";
import PropTypes from 'prop-types';
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {

  const handleClick = () => {
    window.scrollTo(0, 0); // Scrolls to the top when the movie card is clicked
  };

  console.log("Rendering MovieCard for:", movie.Title, movie);

  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="text-decoration-none" onClick={handleClick}>
    <Card className="h-100 bg-dark text-white">
      <Card.Img className="w-100" variant="top" src={movie.Img} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.Title}</Card.Title>
          <div className="mt-auto">
          <Button variant="link" className="text-decoration-none">See details</Button>
          </div>
        </Card.Body>
    </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
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
};
