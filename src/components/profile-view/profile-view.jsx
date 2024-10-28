import React, { useEffect, useState } from "react";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
import { UserInfo } from "./user-info";
import { DeleteProfile } from "./delete-user";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

export const ProfileView = ({ onLoggedOut, allMovies }) => {
  const { username } = useParams();
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    Birthday: "",
    FavoriteMovies: [],
  });
  const [token] = useState(localStorage.getItem("token"));
  const [userUpdate, setUserUpdate] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchUserData = () => {
    if (!token) return;

    fetch(`https://catflix-99a985e6fffa.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        console.log("Fetched user data:", userData);
        setUser({
          Username: userData.Username,
          Email: userData.Email,
          Birthday: userData.Birthday,
          FavoriteMovies: userData.FavoriteMovies || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(error.message); // Set error state
      });
  };

  useEffect(() => {
    console.log("Username from URL params:", username);
    console.log("Token:", token);
    fetchUserData(); // Fetch user data on mount
  }, [username, token]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user.Username) {
    return <div className="loading-msg">Loading user profile...</div>;
  }

  const handleUserUpdate = (updatedUserData) => {
    // Update the user state with the new data
    setUser(updatedUserData);
    console.log("User updated:", updatedUserData);
    fetchUserData(); // Fetch the updated user data after updating
  };

  const handleToggleUpdate = () => {
    setUserUpdate(!userUpdate);
  };

  // // Delete profile
  // const handleDeleteProfile = () => {
  //   if (
  //     !window.confirm(
  //       "Are you sure you want to delete your profile? This action is irreversible."
  //     )
  //   ) {
  //     return; // Exit if the user cancels
  //   }

  //   fetch(`https://catflix-99a985e6fffa.herokuapp.com/users/${username}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((response) => {
  //     if (response.ok) {
  //       console.log("Account deleted successfully!");
  //       onLoggedOut();
  //       navigate("/signup");
  //     } else {
  //       alert("Failed to delete account!");
  //     }
  //   });
  // };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="login-view mb-4">
        <Col>
          <UserInfo
            username={username}
            email={user.Email}
            birthday={user.Birthday}
          />

          {userUpdate && <UpdateUser user={user} onUpdate={handleUserUpdate} />}
          <Button onClick={handleToggleUpdate}>
            {userUpdate ? "Cancel Update" : "Update Profile"}
          </Button>

          <DeleteProfile
            username={user.Username}
            token={token}
            onLoggedOut={onLoggedOut}
            navigate={navigate}
          />
        </Col>
        <Row>
          <Col>
            <Link to={`/`}>
              <Button className="back-button btn-dark">Back</Button>
            </Link>
          </Col>
        </Row>
        <FavoriteMovies
          favoriteMovies={allMovies.filter((movie) =>
            user.FavoriteMovies.includes(movie.id)
          )}
        />
      </Row>
    </Container>
  );
};
