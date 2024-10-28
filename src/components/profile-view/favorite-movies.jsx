import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";

export const FavoriteMovies = ({ favoriteMovies }) => {
  return (
    <div>
      <h2 className="mb-3">Your Favorite Cat's Movies</h2>
      <Row>
        {favoriteMovies && favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <p>No favorite movies</p>
        )}
      </Row>
    </div>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
};
