import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

export const FavoriteMovies = ({ favoriteMovies, user, token }) => {
  const [movies, setMovies] = useState(favoriteMovies);

  const removeFromFavorite = (movieId) => {
    fetch(
      `https://catflix-99a985e6fffa.herokuapp.com/users/${user.Username}/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // Filter out the removed movie from the state
          setMovies(movies.filter((movie) => movie.id !== movieId));
        } else {
          // Handle error case
          console.error('Failed to remove movie');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2 className="mb-3">Your Favorite Cat's Movies</h2>
      <Row>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Col className="mb-3" md={6} lg={4} xl={3} key={movie.id}>
               <div className="d-flex flex-column align-items-stretch">
              <MovieCard movie={movie} />
              <Button 
                onClick={() => removeFromFavorite(movie.id)}
                variant="outline-primary" 
                className="btn-sm m-5 p-0 mt-2 w-50 mb-sm-3"
              >
                Remove
              </Button>
              </div>
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
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};
