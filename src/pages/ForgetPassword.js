import "./ForgetPassword.scss";

import email_icon from "../components/assets/email.png";

import { useTitle } from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ForgetPassword = () => {
  useTitle(`Reset Password`);

  const navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const [email, setEmail] = useState("");
  const auth = getAuth();

  const getEmail = (data) => {
    setEmail(data.target.value);
  };

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
    routeChange();
  };

  return (
    <>
      <div className="forgetpassword">
        <NavBar />
        <div className="container">
          <div className="container__header">
            <div className="container__text">Reset Password</div>
            <div className="container__text--underline"></div>
          </div>

          <div className="container__inputbox">
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
          </div>
          <div className="container__submitbtn" onClick={triggerResetEmail}>
            Reset
          </div>
        </div>
      </div>
    </>
  );
};
