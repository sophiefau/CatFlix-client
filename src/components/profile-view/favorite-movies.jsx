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
          console.error("Failed to remove movie");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Row>
      <h2 className="mb-3">Your Favorite Cat's Movies</h2>
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <Col
            className="mb-3 d-flex flex-column align-items-stretch"
            md={6}
            lg={4}
            xl={3}
            key={movie.id}
          >
            <div className="h-100 d-flex flex-column">
            <MovieCard movie={movie} className="h-100"/>
            <Button
              onClick={() => removeFromFavorite(movie.id)}
              variant="outline-primary"
              className="btn-sm mt-2 m-4 p-0 btn-small-screen"
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
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};
