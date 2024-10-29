import PropTypes from "prop-types";

export const UserInfo = ({ username, email, birthday }) => {
  console.log("Fetch User Data:", username, email, birthday);

  // Check if the user data is available and contains the necessary fields
  if (!username || !email || !birthday) {
    return <p>loading user information...</p>;
  }

  return (
    <>
      <h2 className="mb-4">Your Profile</h2>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {new Date(birthday).toLocaleDateString()}</p>
    </>
  );
};

UserInfo.prototype = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
};
