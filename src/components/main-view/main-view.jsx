import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://catflix-99a985e6fffa.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data:', data);
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Img: movie.Img,
          Director: movie.Director,
          Cat: movie.Cat,
          Genre: movie.Genre,
          Year: movie.Year,
          Synopsis: movie.Synopsis,
          Animation: movie.Animation,
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error));
}, [token]);

<<<<<<< HEAD
if (!user) {
  return (
    <>
      <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }} />
      <SignupView />
    </>
=======
// Filter similar movies
let similarMovies = [];

if (selectedMovie) {
  similarMovies = movies.filter(
    (movie) =>
      movie.Genre.Name === selectedMovie.Genre.Name &&
      movie.Animation === selectedMovie.Animation &&
      movie._id !== selectedMovie._id // Exclude the current selected movie
>>>>>>> 0ac51bec795668e6c294f1bcac3bf17ffaf99a6f
  );
}

return (
  <Row className="justify-content-md-center">
    {!user ? (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    ) : selectedMovie ? (
        <Col md={8}>
        <MovieView
          movie={selectedMovie}
          similarMovies={similarMovies}
          onBackClick={() => setSelectedMovie(null)}
        />
        <br />
        <Container className="similar-movies">
        <h3>Similar Movies</h3>
        <Row>
        {similarMovies.length > 0 ? (
          similarMovies.map((movie) => (
            <Col xs={12} sm={8} md={6} lg={4} key={movie._id}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))
        ) : (
          <div>No similar movies found</div>
        )}
        </Row>
        </Container>
        </Col>
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>

        {movies.map((movie) => (
          <Col className="mb-5" key={movie.id} xs={12} sm={8} md={6} lg={4} xl={3}>
          <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        </Col>
        ))}
      </>
    )}
  </Row>
);
};