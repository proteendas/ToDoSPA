import "./Login.scss";

import user_icon from "../components/assets/person.png";
import email_icon from "../components/assets/email.png";
import password_icon from "../components/assets/password.png";
import google_icon from "../components/assets/google.png";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useTitle } from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export const SignUp = () => {
  useTitle(`Sign Up`);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

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

  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      routeChangeHome();
    } catch (error) {
      console.log(error);
    }
  };

  const auth = getAuth();

  useEffect(() => {
    if (user != null) {
      routeChangeHome();
    }
  }, []);

  const getName = (data) => {
    setName(data.target.value);
  };

  const getEmail = (data) => {
    setEmail(data.target.value);
  };

  const getPassword = (data) => {
    setPassword(data.target.value);
  };

  const handleSignUp = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          user.displayName = name;
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
        <div className="container__text">Sign Up</div>
        <div className="container__text--underline"></div>
      </div>
      <div className="container__submit">
        <div className="container__tab" onClick={routeChangeSignUp}>
          Sign Up
        </div>
        <div
          className="container__tab container__tab--inactive"
          onClick={routeChangeLogin}
        >
          Login
        </div>
      </div>
      <div className="container__inputbox">
        <div className="container__inputfield">
          <img
            src={user_icon}
            className="container__inputfieldicon"
            alt="user_icon"
          />
          <input
            type="text"
            placeholder="Full Name"
            onChangeCapture={getName}
          />
        </div>
        <div className="container__inputfield">
          <img
            src={email_icon}
            className="container__inputfieldicon"
            alt="email_icon"
          />
          <input
            type="email"
            placeholder="Email ID"
            onChangeCapture={getEmail}
          />
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
        Existing User? <span onClick={routeChangeLogin}>Login</span>
      </div>
      <div className="container__submitbtn" onClick={handleSignUp}>
        Sign Up
      </div>
      <div className="signin-with">
        <span>Continue with:</span>
        <img
          className="google-button"
          src={google_icon}
          onClick={handleGoogleSignIn}
          alt="google-signup"
        />
      </div>
    </div>
  );
};
