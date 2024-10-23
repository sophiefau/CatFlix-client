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

  const addtoFavorite = () => {
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

  const removefromFavorite = () => {
    fetch(
      `https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}/${movieId}`,
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
      <Row className="mb-4">
        <Col>
          <img className="w-100" src={movie.Img} alt={movie.Title} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h2>Movie Details</h2>
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

          <Button onClick={isFavorite ? removefromFavorite : addtoFavorite}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <br />

          <Link to={`/`}>
            <Button className="back-button" onClick={handleClick}>
              Back
            </Button>
          </Link>
        </Col>
      </Row>

      <div className="similar-movies">
        <h3>Similar Movies</h3>
        <Row>
          {similarMovies.length > 0 ? (
            similarMovies.map((similarMovie) => (
              <Col xs={12} sm={8} md={6} lg={4} key={similarMovie.id}>
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
