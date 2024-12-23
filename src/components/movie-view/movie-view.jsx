import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((m) => m.id === movieId);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };
  
  if (!movie) {
    return <div>Movie not found</div>;
  }

  // Find similar movies
  const similarMovies = movies.filter(
    (m) =>
      m.id !== movieId &&
      m.Genre.Name === movie.Genre.Name &&
      m.Animation === movie.Animation
  );

  // Add-remove favorite movie
  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorite);
    }
  }, [movieId, user]);

  const addToFavorite = () => {
    if (!token) {
      console.log("No token found. Please log in again.");
      return;
    }

    fetch(
      `https://catflix-99a985e6fffa.herokuapp.com/users/${user.Username}/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (!response.ok) {
          throw new Error(
            `Error: ${response.status} 'Failed to add to favorites'}`
          );
        }
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFromFavorite = () => {
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
          return response.json();
        }
        if (!response.ok) {
          throw new Error("Failed to remove this movie from favorites");
        }
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row className="my-4 custom-margin-sm">
        <Col className="mb-4 me-0" sm={12} md={5} lg={4}>
          <img className="my-2 w-100" src={movie.Img} alt={movie.Title} />
        </Col>
        <Col sm={12} md={7} lg={8}>
          <h1 className="mb-4">Movie Details</h1>
          <div className="mb-2">
            <strong>Title:</strong> {movie.Title}
          </div>
          <div className="mb-2">
            <strong>Director:</strong> {movie.Director}
          </div>
          <div>
            <strong>Cat:</strong> {movie.Cat?.Name}
            <Link
              to={`/cats/${movie.Cat?.Name}`}
              className="btn btn-primary btn-sm ms-2"
            >
              View Cat
            </Link>
          </div>
          <div className="mb-2">
            <strong>Genre:</strong> {movie.Genre?.Name}
          </div>
          <div className="mb-2">
            <strong>Year:</strong> {movie.Year}
          </div>
          <div className="mb-2">
            <strong>Country:</strong> {movie.Country}
          </div>
          <div className="mb-2">
            <strong>Synopsis:</strong> {movie.Synopsis}
          </div>

          <Button
            className="btn-sm my-3"
            onClick={isFavorite ? removeFromFavorite : addToFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Col>
          <Col>
              <Button className="btn btn-dark my-2" onClick={handleBackClick}>
                Back
              </Button>
          </Col>
      </Row>

      <Row className="my-4 custom-margin-sm">
        <h2 className="mb-3">Similar Movies</h2>
          {similarMovies.length > 0 ? (
            similarMovies.map((similarMovie) => (
              <Col className="mb-3" md={6} lg={4} xl={3} key={similarMovie.id}>
                <MovieCard movie={similarMovie} />
              </Col>
            ))
          ) : (
            <div>No similar movies found</div>
          )}
        </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Img: PropTypes.string,
      Director: PropTypes.string,
      Cat: PropTypes.shape({
        Name: PropTypes.string,
        ColorBreed: PropTypes.string,
        Bio: PropTypes.string,
        Img: PropTypes.string,
      }),
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string,
      }),
      Animation: PropTypes.bool,
      Year: PropTypes.string,
      Country: PropTypes.string,
      Synopsis: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
  token: PropTypes.string,
  setUser: PropTypes.func.isRequired,
};