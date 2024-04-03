import "./Login.scss";

import email_icon from "../components/assets/email.png";
import password_icon from "../components/assets/password.png";
import google_icon from "../components/assets/google.png";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useTitle } from "../hooks/useTitle";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  useTitle(`Login`);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  const routeChangeSignUp = () => {
    let path = "/SignUp";
    navigate(path);
  };

  const routeChangeLogin = () => {
    let path = "/";
    navigate(path);
  };

  const routeChangeHome = () => {
    let path = "/Home";
    navigate(path);
  };

  const routeChangeReset = () => {
    let path = "/Reset";
    navigate(path);
  };

  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      routeChangeHome();
    } catch (error) {
      console.log(error);
    }
  };

  const getEmail = (data) => {
    setEmail(data.target.value);
  };

  const getPassword = (data) => {
    setPassword(data.target.value);
  };

  const handleUserSignIn = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          routeChangeHome();
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code: ${errorCode} & Message: ${errorMessage}`);
    }
  };

  return (
    <div className="container">
      <div className="container__header">
        <div className="container__text">Login</div>
        <div className="container__text--underline"></div>
      </div>
      <div className="container__submit">
        <div
          className="container__tab container__tab--inactive"
          onClick={routeChangeSignUp}
        >
          Sign Up
        </div>
        <div className="container__tab" onClick={routeChangeLogin}>
          Login
        </div>
      </div>
      <div className="container__inputbox">
        <div className="container__inputfield">
          <img
            src={email_icon}
            className="container__inputfieldicon"
            alt="email_icon"
          />
          <input type="email" placeholder="Email ID" onChange={getEmail} />
        </div>
        <div className="container__inputfield">
          <img
            src={password_icon}
            className="container__inputfieldicon"
            alt="password_icon"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={getPassword}
          />
        </div>
      </div>

      <div className="container__redirecttext">
        Forget Password? <span onClick={routeChangeReset}>Click Here!</span>
      </div>

      <div className="container__submitbtn" onClick={handleUserSignIn}>
        Login
      </div>
      <div className="container__continuewith">
        <span>Login with:</span>
        <img
          className="container__googlebtn"
          src={google_icon}
          onClick={handleGoogleSignIn}
          alt="google-signup"
        />
      </div>
    </div>
  );
};
