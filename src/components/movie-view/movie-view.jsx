import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((b) => b.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  // Find similar movies
  const similarMovies = movies.filter(
    (m) =>
      m._id !== movieId &&
      m.Genre.Name === movie.Genre.Name &&
      m.isAnimated === movie.isAnimated
  );

  // Add-remove favorite movie
  useEffect(() => {
      if(user && user.FavoriteMovies)  {
          const isFavorite = user.FavoriteMovies.includes(movieId);
          setIsFavorite(isFavorite);
      }
  }, [movieId, user]);

  const addtoFavorite = () => {
      fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}/${movieId}`,
      {
          method: "POST",
          headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
          }
      }).then((response) => {
          if (response.ok) {
            return response.json();
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
      fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}/${movieId}`,
      {
          method: "DELETE",
          headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
          }
      }).then((response) => {
          if (response.ok) {
            return response.json();
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
          <Link to={`/users/${user.Username}/movies/${movieId}`}>
            <Button variant="primary" className="mt-3">
              Go to Favorite Movies
            </Button>
          </Link>
          <Link to={`/`}>
            <Button className="back-button">Back</Button>
          </Link>
        </Col>
      </Row>
      <div className="similar-movies">
        <h3>Similar Movies</h3>
        <Row>
          {similarMovies.length > 0 ? (
            similarMovies.map((similarMovie) => (
              <Col xs={12} sm={8} md={6} lg={4} key={similarMovie._id}>
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