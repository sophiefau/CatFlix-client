import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The Aristocats",
      image: "https://upload.wikimedia.org/wikipedia/en/8/8d/Aristoposter.jpg",
      Director: "Wolfgang Reitherman",
      Cat: "Duchess (mother) and her kittens: Marie, Berlioz, and Toulouse.",
      Genre: "Family",
      Year: "1970",
      Synopsis:
        "A wealthy old woman plans to leave her fortune to her cats, but her butler tries to get rid of them. The cats must find their way back home with the help of a charming alley cat.",
    },
    {
      id: 2,
      Title: "The Garfield Movie",
      image: "https://upload.wikimedia.org/wikipedia/en/9/91/The_Garfield_Movie_2024_poster.jpg",
      Director: "Peter Hewitt",
      Cat: "Garfield",
      Genre: "Animation, Comedy, Family",
      Year: "2004",
      Synopsis:
        "Garfield Garfield, a lazy and sarcastic cat, must deal with a new dog, Odie, in his home. When Odie is kidnapped, Garfield sets out to rescue him.",
    },
    {
      id: 3,
      Title: "A Street Cat Named Bob",
      image: "https://upload.wikimedia.org/wikipedia/en/5/51/A_Street_Cat_Named_Bob_%28film%29.png?20170117135509",
      Cat: "Bob",
      Genre: "Biography, Drama",
      Year: "2016",
      Synopsis:
        "Based on a true story, the film follows a homeless man struggling with addiction who befriends a stray cat, Bob, and finds a new purpose in life.",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
