import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((m) => m.id === movieId);
  const handleClick = () => {
    window.scrollTo(0, 0); // Scrolls to the top when the movie card is clicked
  };
  // console.log("Current movieId:", movieId);
  // console.log("Movies array:", movies);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  // Find similar movies
  const similarMovies = movies.filter(
    (m) =>
      m.id !== movieId &&
      m.Genre.Name === movie.Genre.Name &&
      m.isAnimated === movie.isAnimated
  );
  // console.log("Filtered similarMovies:", similarMovies);

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
    // console.log("Token before request:", token);
    // console.log("Current movieId:", movieId);
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
        console.log("Authorization Token:", token);
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
      <Row className="mb-4">
        <Col className="mb-4 me-0" sm={12} md={5} lg={4}>
          <img className="w-100" src={movie.Img} alt={movie.Title} />
        </Col>
        <Col sm={12} md={7} lg={8}>
          <h1 className="mb-4">Movie Details</h1>
          <div className="mb-2">
            <strong>Title:</strong> {movie.Title}
          </div>
          <div className="mb-2">
            <strong>Director:</strong> {movie.Director}
          </div>
          <div className="mb-2">
            <strong>Cat:</strong> {movie.Cat?.Name}
          </div>
          <div className="mb-2">
            <strong>Genre:</strong> {movie.Genre?.Name}
          </div>
          <div className="mb-2">
            <strong>Year:</strong> {movie.Year}
          </div>
          <div className="mb-2">
            <strong>Synopsis:</strong> {movie.Synopsis}
          </div>

          <Button className="btn-sm" onClick={isFavorite ? removeFromFavorite : addToFavorite}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          </Col>
<Row>
  <Col>
          <Link to={`/`}>
            <Button className="back-button btn-dark" onClick={handleClick}>
              Back
            </Button>
          </Link>
        </Col>
        </Row>
      </Row>

      <div>
        <h2 className="mb-3">Similar Movies</h2>
        <Row>
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
      </div>
    </Container>
  );
};
