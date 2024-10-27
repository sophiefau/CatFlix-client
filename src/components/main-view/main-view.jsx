import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    console.log("Token being used:", token);

    setLoading(true);

    fetch("https://catflix-99a985e6fffa.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized access. Please log in again.");
          onLoggedOut(); // Log out the user if unauthorized
          return; // Exit early
        }
        throw new Error("Failed to fetch movies.");
      }
      return response.json();
    })
      .then((movies) => {
        console.log("Fetched movies:", movies);
        const moviesFromApi = movies.map((movie) => ({
          id: movie._id,
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
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to get movies. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col>
                      <LoginView onLoggedIn={onLoggedIn} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        user={user}
                        token={token}
                        setUser={setUser}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4 d-flex justify-content-center" key={movie.id} sm={12} md={6} lg={4} xl={3}> 
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/users/:username"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        onLoggedOut={onLoggedOut}
                        allMovies= {movies}
                      />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        )}
      </Row>
    </BrowserRouter>
  );
};

// "Welcome to CatFlix, the ultimate app showcasing a delightful collection of movies featuring our feline friends! Discover, rate, and share your favorite cat movies, and immerse yourself in a world of cuteness and adventure."
