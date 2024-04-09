import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Logo from "./assets/logo.png";

export const NavBar = () => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const routeChangeHome = () => {
    let path = "/Home";
    navigate(path);
  };

  const routeChangeLogin = () => {
    let path = "/";
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__logo" onClick={routeChangeHome}>
        <img src={Logo} alt="ToDo" />
        <span className="navbar__logotext">ToDo</span>
      </div>
      {user ? (
        <span className="navbar__item">Welcome {user.displayName}!</span>
      ) : (
        <div></div>
      )}
      {user ? (
        <span className="navbar__btn" onClick={handleSignOut}>
          Log Out
        </span>
      ) : (
        <span className="navbar__btn" onClick={routeChangeLogin}>
          Log In
        </span>
      )}
    </header>
  );
};
