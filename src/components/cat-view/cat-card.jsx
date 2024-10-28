// import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export const CatCard = ({ cat }) => {
  const handleClick = () => {
    window.scrollTo(0, 0); // Scrolls to the top when the movie card is clicked
  };

  return (
    <div className="cat-card">
    <Link
    to={`/cats/${cat.Name}`}
    onClick={handleClick}
    className="text-decoration-none"
  >
    <Card className="h-100 w-100 bg-dark">
      
      <Card.Body className="d-flex flex-column">
        <Card.Title>{cat.Name}</Card.Title>
        <div className="mt-auto">
            <Button variant="link" className="m-0 p-0 text-decoration-none">
              See details
            </Button>
            </div>
      </Card.Body>
      
    </Card>
    </Link>
    </div>
  );
};