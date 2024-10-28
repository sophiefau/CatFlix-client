import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

export const CatList = ({ token }) => {
  const [cats, setCats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    window.scrollTo(0, 0); // Scrolls to the top when the movie card is clicked
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    console.log("Token being used:", token);

    setLoading(true);

    fetch("https://catflix-99a985e6fffa.herokuapp.com/cats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized access. Please log in again.");
          return; // Exit early
        }
        throw new Error("Failed to fetch movies.");
      }
      return response.json();
    })
      .then((catsData) => {
        console.log("Fetched cats:", catsData);
        setCats(catsData);
      })
      .catch((error) => {
        console.error("Error fetching cats:", error);
        setError("Failed to get cats. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div className="loading-msg">{"loading..."}</div>;
  }

  return (
    <Container>
    <h1 className="my-4">Cat Movie Stars</h1>
    <Row>
      {cats.map((cat, index) => ( // Map over the cats array to render each cat
        <Col key={index} md={4} className="mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{cat.Name}</h5>
              <p className="card-text">Color/Breed: {cat.ColorBreed}</p>
              <p className="card-text">Bio: {cat.Bio}</p>
              <p className="card-text">Movies: {cat.Movies.join(', ')}</p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
    <Row>
    <Link to={`/`}>
            <Button className="back-button btn-dark" onClick={handleClick}>
              Back
            </Button>
          </Link>
    </Row>
  </Container>
  );
};
