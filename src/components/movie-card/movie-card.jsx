import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.id)}`}
      className="text-decoration-none"
      onClick={handleClick}
    >
      <Card className="h-100 bg-dark">
        <div className="movies_img">
          <Card.Img
            className="w-100"
            variant="top"
            src={movie.Img}
            alt={movie.Title + "poster"}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.Title}</Card.Title>
          <div className="mt-auto">
            <Button variant="link" className="m-0 p-0 text-decoration-none">
              See details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Img: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Cat: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      ColorBreed: PropTypes.string,
      Bio: PropTypes.string,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Year: PropTypes.string.isRequired,
    Synopsis: PropTypes.string.isRequired,
    Animation: PropTypes.bool.isRequired,
  }).isRequired,
};
