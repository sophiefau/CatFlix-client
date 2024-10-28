import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
// import { Container } from 'react-bootstrap';

export const CatView = () => {
  const { movieId } = useParams();
  const [cat, setCat] = useState(null);
  const [error, setError] = useState("");

  useEffect() => {
    fetch(`https://catflix-99a985e6fffa.herokuapp.com/cats/${cat.Name}`, {
      headers: {
        Authorization: `Bearer ${token}`, // make sure to pass token if needed
      },
    })
      .then((response) => response.json())
      .then((data) => setCat(data))
      .catch((err) => setError("Failed to fetch cat details"));
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!cat) {
    return <div>Loading cats...</div>;
  }

  return (
    <Container>
      <h2>{cat.Name}</h2>
      <p>Color/Breed: {cat.ColorBreed}</p>
      <p>Bio: {cat.Bio}</p>
      <p>Movies: {cat.Movies.join(", ")}</p>
    </Container>
  );
};