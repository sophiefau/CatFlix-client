import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

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

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.Genre.Name === selectedMovie.Genre.Name &&
        movie.Animation === selectedMovie.Animation &&
        movie._id !== selectedMovie._id // Exclude the current selected movie
    );

    return (
      <div>
        <MovieView
          movie={selectedMovie}
          similarMovies={similarMovies}
          onBackClick={() => setSelectedMovie(null)}
        />
        <br />
        <h3>Similar Movies</h3>
        <div>
          {similarMovies.length > 0 ? (
            similarMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            ))
          ) : (
            <div>No similar movies found</div>
          )}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
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
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};


