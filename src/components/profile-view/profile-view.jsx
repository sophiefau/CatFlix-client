import React, { useEffect, useState } from "react";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
import { UserInfo } from "./user-info";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export const ProfileView = () => {
  const { username } = useParams();
  const [user, setUser] = useState({ Username: "", Email: "", Birthday: "", FavoriteMovies: [] });
  const [token] = useState(localStorage.getItem("token"));
  const [userUpdate, setUserUpdate] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirecting after deletion

  useEffect(() => {
    console.log("Username from URL params:", username);
    console.log("Token:", token);
    if (!token) return;
    
    if (username) {
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
          
          setUser({
            Username: userData.Username,
            Email: userData.Email,
            Birthday: userData.Birthday,
            FavoriteMovies: userData.FavoriteMovies || [],
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [username, token]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user.Username) {
    return <div>Loading user profile...</div>; 
  }

  // // Function to toggle the update view
  const handleToggleUpdate = () => {
    setUserUpdate(!userUpdate);
  };

  // Function to handle user deletion
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
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the profile.");
        }
        return response.json();
      })
      .then(() => {
        console.log("Profile deleted successfully.");
        // Redirect the user after successful deletion
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
      });
  };

  // Function to handle removing a movie from favorites
  const removeFromFavorite = (movieId) => {
    const updatedFavorites = user.FavoriteMovies.filter((id) => id !== movieId);

    fetch(
      `https://catflix-99a985e6fffa.herokuapp.com/users/${username}/movies/${movieId}`,
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
