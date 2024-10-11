import { useState } from 'react';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

/// Add errors message form non-validation
  const usernameRegex = /^[a-z]{5,}$/;
  if (usernameRegex.test(username)) {
    setUsernameError("Username must be at least 5 characters long and contain only lowercase letters.");
    return; // Stop the form submission if validation fails
  }

  if (password.length < 8) {
    setPasswordError("Password must be at least 8 characters long.");
    return; // Stop the form submission if validation fails
  }

  setUsernameError("");

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://catflix-99a985e6fffa.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        response.json().then((err) => {
          console.log('Error details:', err); 
          alert("Signup failed");
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </label>
      {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>} 

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};