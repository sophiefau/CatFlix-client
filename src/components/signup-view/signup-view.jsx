import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameAlreadyUsed, setUsernameAlreadyUsed] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsernameError("");
    setUsernameAlreadyUsed("");
    setPasswordError("");
    setEmailError("");
    setEmailAlreadyUsed("");
    setBirthdayError("");

    // /// Add errors messages form non-validation
    const usernameRegex = /^[a-z]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username must be at least 5 characters long and contain only lowercase letters."
      );
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!birthday) {
      setBirthdayError("Birthday is required.");
      return;
    }

    if (!isValid) {
      return; // Stop the form submission if validation fails
    }

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://catflix-99a985e6fffa.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        // Handle server-side validation errors
        response.json().then((err) => {
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
          } else {
            alert("Signup failed");
          }
        });
      }
    });
  };

  return (
    <Container className="login-container">
      <h1>Please Register to use CatFlix</h1>
      <Form onSubmit={handleSubmit} noValidate>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formSignupUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
                placeholder="use only lowercase letters"
                isInvalid={!!usernameError || !!usernameAlreadyUsed}
              />
              <Form.Control.Feedback type="invalid">
              {usernameError || usernameAlreadyUsed}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formSignupPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="must be at least 8 characters long"
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formSignupEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="enter a valid email address"
                isInvalid={!!emailError || !!emailAlreadyUsed}
              />
              <Form.Control.Feedback type="invalid">
                  {emailError || emailAlreadyUsed}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formSignupBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                isInvalid={!!birthdayError}
              />
              <Form.Control.Feedback type="invalid">
                  {birthdayError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Sign up to CatFlix
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
