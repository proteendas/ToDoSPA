import "./Login.scss";

import email_icon from "../components/assets/email.png";

import { useTitle } from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  useTitle(`Reset Password`);

  const navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Reset Password</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={email_icon} className="icon" alt="email_icon" />
          <input type="email" placeholder="Email ID" />
        </div>
      </div>
      <div className="submit-button" onClick={routeChange}>
        Reset
      </div>
    </div>
  );
};
