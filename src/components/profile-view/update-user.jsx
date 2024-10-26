import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export const UpdateUser = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
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
      setUsernameError(
        "Username must be at least 5 characters long and contain only lowercase letters."
      );
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
    fetch(`https://catflix-99a985e6fffa.herokuapp.com/users/${user.Username}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // Handle server-side validation errors
          return response.json().then((err) => {
            if (err.errors) {
              err.errors.forEach((error) => {
                if (error.param === "Username") {
                  if (error.msg === "Username already exists") {
                    setUsernameAlreadyUsed("This username is already taken.");
                  } else {
                    setUsernameError(error.msg);
                  }
                }
                if (error.param === "Email") {
                  if (error.msg === "Email already exists") {
                    setEmailAlreadyUsed("This email is already used.");
                  } else {
                    setEmailError(error.msg);
                  }
                }
              });
            }
          });
        }
      })
      .then((result) => {
        navigate(`/users/${result.Username}`);
        console.log("User updated successfully:", result);
        onUpdate(updatedUser);
        window.location.reload(); // Reload the page after updating
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("An error occurred while updating the user.");
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h3 className="text-center">Update Your Profile</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
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
