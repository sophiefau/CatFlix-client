import React, { useEffect, useState } from "react";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
import { UserInfo } from "./user-info";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

export const ProfileView = () => {
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
    return <div>Loading user profile...</div>;
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

  const handleDeleteProfile = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your profile? This action is irreversible."
      )
    ) {
      return; // Exit if the user cancels
    }

    fetch(`https://catflix-99a985e6fffa.herokuapp.com/users/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Account deleted successfully!");
        onLoggedOut();
      } else {
        alert("Failed to delete account!");
      }
    });
  };

  // Function to handle removing a movie from favorites
  const removeFromFavorite = (movieId) => {
    const updatedFavorites = user.FavoriteMovies.filter((id) => id !== movieId);

    fetch(
      `https://catflix-99a985e6fffa.herokuapp.com/users/${username}/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ favoriteMovies: updatedFavorites }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update favorites.");
        }
        return response.json();
      })
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          FavoriteMovies: updatedFavorites,
        }));
        console.log("Removed from favorites:", movieId);
      })
      .catch((error) => {
        console.error("Error removing from favorites:", error);
      });
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <UserInfo
            username={username}
            email={user.Email}
            birthday={user.Birthday}
          />

          {userUpdate && <UpdateUser user={user} onUpdate={handleUserUpdate} />}
          <Button variant="secondary" onClick={handleToggleUpdate}>
            {userUpdate ? "Cancel Update" : "Update Profile"}
          </Button>

          <Button
            variant="danger"
            onClick={handleDeleteProfile}
            className="ms-2"
          >
            Delete Profile
          </Button>

          <Link to={`/`}>
            <Button className="back-button">Back</Button>
          </Link>
        </Col>
        <FavoriteMovies
          favoriteMovies={user.FavoriteMovies}
          removeFromFavorite={removeFromFavorite}
        />
      </Row>
    </Container>
  );
};
