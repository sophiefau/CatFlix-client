import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Row, Col } from "react-bootstrap";

export const FavoriteMovies = ({ favoriteMovies, removeFromFavorite }) => {
  return (
    <div>
      <h3>Your Favorite Cat's Movies</h3>
      <Row>
        {favoriteMovies && favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard movie={movie} />
              <Button
                variant="danger"
                onClick={() => removeFromFavorite(movie._id)}
              >
                Remove from Favorites
              </Button>
            </Col>
          ))
        ) : (
          <p>No favorite movies</p>
        )}
      </Row>
    </div>
  );
};


// Tonny Ntambaazi
// 17:43
// allMovies.filter(movie => user.FavoriteMovies.includes(movie.id))

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
};
