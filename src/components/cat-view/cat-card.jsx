import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export const CatCard = ({ cat }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="cat-card">
      <Link
        to={`/cats/${cat.Name}`}
        onClick={handleClick}
        className="text-decoration-none"
      >
        <Card className="h-100 w-100 bg-dark">
        <div>
    <Card.Img
      className="w-100"
      variant="top"
      src={cat.Img}
      alt={cat.Name + "portrait"}
    />
  </div>
          <Card.Body className="d-flex flex-column">
            <Card.Title>{cat.Name}</Card.Title>
            <div className="mt-auto">
              <Button variant="link" className="m-0 p-0 text-decoration-none see-details">
                See details
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};