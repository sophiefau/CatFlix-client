import { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export const UpdateUser = ({ user, onUpdate }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameAlreadyUsed, setUsernameAlreadyUsed] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear previous errors
    setUsernameError("");
    setUsernameAlreadyUsed("");
    setPasswordError("");
    setEmailError("");
    setEmailAlreadyUsed("");

    // Validation checks
    const usernameRegex = /^[a-z]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (username && !usernameRegex.test(username)) {
      setUsernameError("Username must be at least 5 characters long and contains only lowercases letters.");
      isValid = false;
    }

    if (password && password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (email && !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!isValid) {
      return; // Stop the form submission if validation fails
    }

    // Create a payload with only the fields that have values
    const updatedUser = {};
    if (username) updatedUser.Username = username;
    if (email) updatedUser.Email = email;
    if (password) updatedUser.Password = password;

    // Update user information in the database
    console.log("Updated user object before fetch:", updatedUser);
    fetch(`https://catflix-99a985e6fffa.herokuapp.com/users/${user.Username}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Username:", username);
console.log("Email:", email);
console.log("Password:", password);
console.log("Fetch request data:", JSON.stringify(updatedUser));
if (password) {
  console.log("Password before adding to updatedUser:", password);
  updatedUser.Password = password;
}
  if (response.ok) {
    return response.json();
  } else {
    // Handle server-side validation errors
    return response.json().then((err) => {
      if (err.message) {
        if (err.message === "Username is already in use.") {
          setUsernameAlreadyUsed("This username is already taken.");
        }
        if (err.message === "Email is already in use.") {
          setEmailAlreadyUsed("This email is already used.");
        }
      }
      throw new Error("Validation failed");
    });
  }
})
      .then((result) => {
        navigate(`/users/${result.Username}`);
        console.log("Updated user data:", updatedUser);
        onUpdate(updatedUser);
        window.location.reload(); // Reload the page after updating
      })
      .catch((error) => {
        // console.error("Error updating user:", error);
        if (error.response) {
          console.error("Server response:", error.response);
        } else {
          console.error("Error updating user, no server response:", error);
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h1 className="text-center">Update Your Profile</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="At least 5 characters long and only lowercase letters"
                isInvalid={!!usernameError || !!usernameAlreadyUsed}
              />
              <Form.Control.Feedback type="invalid">
                {usernameError || usernameAlreadyUsed}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new valid email"
                isInvalid={!!emailError || !!emailAlreadyUsed}
              />
              <Form.Control.Feedback type="invalid">
                {emailError || emailAlreadyUsed}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must be at least 8 characters"
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


UpdateUser.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};