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
          <input type="email" placeholder="Email ID" />
        </div>
      </div>
      <div className="container__submitbtn" onClick={routeChange}>
        Reset
      </div>
    </div>
  );
};
