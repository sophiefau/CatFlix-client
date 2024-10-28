import React, { useState } from "react";
import PropTypes from "prop-types";
import { ConfirmDelete } from "./confirm-delete";
import { Button } from "react-bootstrap";

import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export const DeleteProfile = ({ username, token, onLoggedOut, navigate }) => {
  const [showConfirm, setShowConfirm] = useState(false); 

  // Function to handle profile deletion
  const handleDeleteProfile = () => {
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
        navigate("/signup");
      } else {
        alert("Failed to delete account!");
      }
      setShowConfirm(false); // Close the dialog
    });
  };

  return (
    <>
      <Button onClick={() => setShowConfirm(true)} className="ms-3">
        Delete Profile
      </Button>
      <ConfirmDelete
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleDeleteProfile}
        message="Are you sure you want to delete your profile? This action is irreversible."
      />
    </>
  );
};


DeleteProfile.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
