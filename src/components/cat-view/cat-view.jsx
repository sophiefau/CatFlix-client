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
    return <div className="loading-msg">loading cats...</div>;
  }

  return (
    <Container>
      <Row className="my-4 custom-margin-sm">
        <Col className="mb-4 me-0" sm={12} md={6} lg={4}>
          <img
            className="my-2 w-100"
            src={cat.Img}
            alt={cat.Name + "portrait"}
          />
        </Col>
        <Col sm={12} md={6} lg={8}>
          <h1 className="mb-4">{cat.Name}</h1>
          <div className="mb-3">
            <strong>Color/Breed:</strong> {cat.ColorBreed}
          </div>
          <div className="mb-3">
            <strong>Bio:</strong> {cat.Bio}
          </div>
        </Col>
        <Col>
          <Button className="btn btn-dark my-2" onClick={handleBackClick}>
            Back
          </Button>
        </Col>
      </Row>
      <Row className="mb-3 custom-margin-sm">
        <h2>Movies:</h2>
        {cat.Movies.map((movie) => (
          <Col className="mb-3" sm={12} md={6} lg={4} key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
