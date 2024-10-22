import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const UpdateUser = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [emailError, setEmailError] = useState(''); 
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameAlreadyUsed, setUsernameAlreadyUsed] = useState('');
  const [token] = useState(localStorage.getItem("token"));

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError('');
    setUsernameAlreadyUsed('');
    setPasswordError('');
    setEmailError('');
    setEmailAlreadyUsed('');

    // Validation checks
    const usernameRegex = /^[a-z]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (username && !usernameRegex.test(username)) {
      setUsernameError('Username must be at least 5 characters long and contain only lowercase letters.');
      isValid = false;
    }

    if (password && password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }

    if (email && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!isValid) {
      return; // Stop the form submission if validation fails
    }

    // Check if username or email already exists in the database
    const checkUrl = `https://catflix-99a985e6fffa.herokuapp.com/users`; 
    const response = await fetch(checkUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    });

    const data = await response.json();

    if (data.usernameAlreadyExists) {
      setUsernameAlreadyUsed('This username is already taken.');
      return;
    }

    if (data.emailAlreadyExists) {
      setEmailAlreadyUsed('This email is already used.');
      return;
    }

    // Create a payload with only the fields that have values
    const updatedUser = {};
    if (username) updatedUser.username = username;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;

    // Update user information in the database
    const url = `https://catflix-99a985e6fffa.herokuapp.com/users/${username}`; 
    const updateResponse = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Ensure you have access to the token
      },
      body: JSON.stringify(updatedUser),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      // Handle errors from the server response
      if (errorData.errors) {
        errorData.errors.forEach((error) => {
          if (error.param === 'Username') {
            setUsernameError(error.msg);
          }
          if (error.param === 'Email') {
            setEmailError(error.msg);
          }
        });
      } else {
        console.error('Error updating user data:', errorData);
      }
      return; // Stop further execution if the update fails
    }

    const result = await updateResponse.json();
    console.log('User updated successfully:', result);
    
    // Trigger the onUpdate function passed as a prop to update the user info
    onUpdate(updatedUser);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="text-center">Update Your Profile</h3>
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
