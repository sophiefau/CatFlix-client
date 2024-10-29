import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../img/catflix_logo_trans.png";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="mb-4 fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src={logo} alt="Logo for CatFlix App" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <NavLink as={Link} to="/login" className={"profile-signup"}>
                  Login
                </NavLink>
                <NavLink as={Link} to="/signup" className={"profile-signup"}>
                  Signup
                </NavLink>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/cats">
                  Cats
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
