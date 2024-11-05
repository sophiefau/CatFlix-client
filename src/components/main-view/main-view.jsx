import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { CatList } from "../cat-view/cat-list";
import { CatView } from "../cat-view/cat-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";

export const MainView = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

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

    setLoading(true);

    fetch("https://catflix-99a985e6fffa.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized access. Please log in again.");
            onLoggedOut();
            return;
          }
          throw new Error("Failed to fetch movies.");
        }
        return response.json();
      })
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => ({
          id: movie._id,
          Title: movie.Title,
          Img: movie.Img,
          Director: movie.Director,
          Cat: movie.Cat,
          Genre: movie.Genre,
          Year: movie.Year,
          Country: movie.Country,
          Synopsis: movie.Synopsis,
          Animation: movie.Animation,
        }));
        dispatch(setMovies(moviesFromApi));
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

  if (loading) {
    return <div className="loading-msg">{"loading movies..."}</div>;
  }

  const filteredMovies = movies.filter((movie) => {
    const lowerCaseFilter = filter.toLowerCase();

    const genreName = movie.Genre && movie.Genre.Name ? movie.Genre.Name : "";

    return (
      movie.Title.toLowerCase().includes(lowerCaseFilter) ||
      genreName.toLowerCase().includes(lowerCaseFilter)
    );
  });

  const resetFilter = () => {
    setFilter("");
    window.scrollTo(0, 0);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center custom-margin-sm">
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
            path="/"
            onClick={resetFilter}
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : filteredMovies.length === 0 ? (
                  <Col className="text-center">
                    No cat movie found!
                    <button onClick={resetFilter} className="btn btn-dark ms-2">
                      Back
                    </button>
                  </Col>
                ) : (
                  <>
                    <Col className="mb-12" sm={11}>
                      <input
                        type="text"
                        placeholder="Filter by title or genre..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="form-control"
                      />
                    </Col>
                    {filteredMovies.map((movie) => (
                      <Col
                        className="mb-4 d-flex justify-content-center"
                        key={movie.id}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                      >
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
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
                  <Col className="text-center">No cat movie found!</Col>
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
            path="/cats"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <CatList movies={movies} token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/cats/:name"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <CatView movies={movies} token={token} />
                  </Col>
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
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      token={token}
                      onLoggedOut={onLoggedOut}
                      allMovies={movies}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
