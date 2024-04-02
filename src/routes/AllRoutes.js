import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ForgetPassword } from "../pages/ForgetPassword";
import { HomePage } from "../pages/HomePage";
import { Protected } from "../components/Protected";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Home"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route path="/Reset" element={<ForgetPassword />} />
      </Routes>
    </>
  );
};
