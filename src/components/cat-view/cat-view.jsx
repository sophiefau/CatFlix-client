import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const CatView = ({ token }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [cat, setCat] = useState(null);
  const [error, setError] = useState("");

  const handleBackClick = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetch(`https://catflix-99a985e6fffa.herokuapp.com/cats/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cat details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Retrieved cat data:", data);
        setCat(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch cat details");
      });
  }, [name, token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!cat) {
    return <div>loading cats...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-4">{cat.Name}</h1>
          <div className="mb-3">
            <strong>Color/Breed:</strong> {cat.ColorBreed}
          </div>
          <div className="mb-3">
            <strong>Bio:</strong> {cat.Bio}
          </div>
        </Col>
      </Row>

      <div className="mb-3">
        <h2>Movies:</h2>
        <Row>
          {cat.Movies.map((movie) => (
            <Col className="mb-3" key={movie.id}>
              <MovieCard movie={movie}/>
            </Col>
          ))}
        </Row>
      </div>
      <Row>
        <Col>
          <Link to={`/cats`}>
            <Button className="back-button btn-dark" onClick={handleBackClick}>
              Back
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
