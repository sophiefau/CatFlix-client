import PropTypes from "prop-types";

export const UserInfo = ({ username, email, birthday }) => {
  console.log("Fetch User Data:", username, email, birthday);

 // Check if the user data is available and contains the necessary fields
 if (!username || !email || !birthday) {
  return <p>Loading user information...</p>;
}

return (
  <>
    <h2>Your Profile</h2>
    <p>Username: {username}</p>
    <p>Email: {email}</p>
    <p>Birthday: {new Date(birthday).toLocaleDateString()}</p>
  </>
);
};

UserInfo.prototype = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired
};



// import PropTypes from "prop-types";

// export const UserInfo = ({ user }) => {
//   const { Username, Email, Birthday } = user;
//   console.log("Fetch User Data:", Username, Email, Birthday);

//  // Check if the user data is available and contains the necessary fields
//  if (!user || !user.Username || !user.Email || !user.Birthday) {
//   return <p>Loading user information...</p>;
// }

// return (
//   <>
//     <h2>Your Profile</h2>
//     <p>Username: {Username}</p>
//     <p>Email: {Email}</p>
//     <p>Birthday: {new Date(Birthday).toLocaleDateString()}</p>
//   </>
// );
// };

// UserInfo.propTypes = {
//   user: PropTypes.shape({
//     Username: PropTypes.string.isRequired,
//     Email: PropTypes.string.isRequired,
//     Birthday: PropTypes.string.isRequired,
//   }).isRequired,
// };