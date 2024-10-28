import PropTypes from "prop-types";
import React from "react";
import { Card, Button } from "react-bootstrap";

export const CatCard = ({ cat }) => {
  // const handleClick = () => {
  //   window.scrollTo(0, 0); // Scrolls to the top when the movie card is clicked
  // };

  return (
    <Card className="h-100 bg-dark">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{cat.Name}</Card.Title>
        <div className="mt-auto">
          <Button variant="link" className="m-0 p-0 text-decoration-none">
            See details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

CatCard.propTypes = {
  cat: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    ColorBreed: PropTypes.string,
    Bio: PropTypes.string,
    Movies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
