import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // Find selected movie
  const movie = movies.find((m) => m._id === movieId);

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

  return (
    <Container>
      <Row className="mb-4">
        <Col md={6}>
          <img className="w-100" src={movie.Img} alt={movie.Title} />
        </Col>
        <Col md={6}>
          <Row className="mb-3">
            <Col>
              <h2>Movie Details</h2>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="auto" className="fw-bold">
              Title:
            </Col>
            <Col>{movie.Title}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs="auto" className="fw-bold">
              Director:
            </Col>
            <Col>{movie.Director}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs="auto" className="fw-bold">
              Cat:{" "}
            </Col>
            <Col>{movie.Cat.Name}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs="auto" className="fw-bold">
              Genre:{" "}
            </Col>
            <Col>{movie.Genre.Name}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs="auto" className="fw-bold">
              Year:{" "}
            </Col>
            <Col>{movie.Year}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs="auto" className="fw-bold">
              Synopsis:{" "}
            </Col>
            <Col>{movie.Synopsis}</Col>
          </Row>
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