import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    // Reset error messages before a new login attempt
    setUsernameError("");
    setPasswordError("");

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://catflix-99a985e6fffa.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle server-side validation errors
          return response.json().then((err) => {
            if (err.message) {
              // Display specific error messages based on what the backend sends
              if (err.message.includes("username")) {
                setUsernameError("Wrong username");
              }
              if (err.message.includes("password")) {
                setPasswordError("Wrong password");
              }
            }
            return Promise.reject(err); // Stop further processing
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        }
      })
      .catch((e) => {
        console.error("Error during login: ", e);
      });
  };

  return (
    <Container className="login-container">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formLoginUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder=". . . . . . . . ."
                isInvalid={!!usernameError}
              />
              <Form.Control.Feedback type="invalid">
                {usernameError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=". . . . . . . . ."
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Login to CatFlix
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
