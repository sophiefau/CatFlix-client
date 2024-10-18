import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const ProfileView = () => {
  const { username } = useParams(); 
  const [user, setUser] = useState(null);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    console.log("Token:", token);
  console.log("Username:", username);
  
    if (!token || !username) {
      console.log("Token or username is missing");
      return;
    }

    fetch(`https://catflix-99a985e6fffa.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`Network response not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        console.log("Fetched user data:", userData);
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token, username]);

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title>{user.Username}'s Profile</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.Email}
              </Card.Text>
              <Card.Text>
                <strong>Favorite Movies:</strong>{" "}
                {user.FavoriteMovies && user.FavoriteMovies.join(", ")}
              </Card.Text>
              {/* Add any other user information you want to display */}
              <Link to={`/`}>
                <Button className="back-button">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
