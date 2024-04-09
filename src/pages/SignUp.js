import "./Signup.scss";

import user_icon from "../components/assets/person.png";
import email_icon from "../components/assets/email.png";
import password_icon from "../components/assets/password.png";
import google_icon from "../components/assets/google.png";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useTitle } from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

import validator from "validator";
import { NavBar } from "../components/NavBar";

export const SignUp = () => {
  useTitle(`Sign Up`);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const routeChangeLogin = async () => {
    let path = "/";
    navigate(path);
  };

  const routeChangeSignUp = async () => {
    let path = "/SignUp";
    navigate(path);
  };

  const routeChangeHome = async () => {
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

  const authenticate = getAuth();

  useEffect(() => {
    if (user != null) {
      routeChangeHome();
    }
  });

  const getName = (data) => {
    setName(data.target.value);
  };

  const getEmail = (data) => {
    setEmail(data.target.value);
  };

  const getPassword = (data) => {
    setPassword(data.target.value);
  };

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isPassword = (password) => {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
      ? true
      : false;
  };

  const handleSignUp = async () => {
    const msg = isEmail(email)
      ? isPassword(password)
        ? null
        : "Please enter a strong password"
      : "Please enter a valid email";

    if (msg !== null) alert(msg);

    try {
      const { user } = await createUserWithEmailAndPassword(
        authenticate,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
      routeChangeHome();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code: ${errorCode} & Message: ${errorMessage}`);
    }
  };

  return (
    <>
      <div className="signup">
        <NavBar />
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
          <div className="container__continuewith">
            <span>Continue with:</span>
            <img
              className="container__googlebtn"
              src={google_icon}
              onClick={handleGoogleSignIn}
              alt="google-signup"
            />
          </div>
        </div>
      </div>
    </>
  );
};
