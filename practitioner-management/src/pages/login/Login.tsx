import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import Loading from "../../hoc/Loading";
import { RootState } from "../../redux/store";
import { PRACTITIONER } from "../../constants";
import { LoginForm } from "../../components/loginForm/LoginForm";

import "./Login.css";

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );

  return isLoggedIn ? (
    <Navigate to={PRACTITIONER} />
  ) : (
    <Loading isLoading={isLoading}>
      <div className="wrapper center">
        <div className="card center">
          <h1 className="card__title">
            <span>Practitioner Management</span>
          </h1>
          <LoginForm setIsLoading={setIsLoading} />

          <div className="card__footer">
            Don't have an account?{" "}
            <span>
              <Link to="/register">Sign up for free</Link>
            </span>
          </div>
        </div>
      </div>
    </Loading>
  );
};
