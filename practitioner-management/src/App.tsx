import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  getUserIdFromLocalStorage,
  getUserLoginFromLocalStorage,
} from "./utils/localstorage.util";

import AuthRoute from "./hoc/AuthRoute";
import { RootState } from "./redux/store";
import { setId, setIsUserLoggedIn } from "./reducers";

import { Login } from "./pages/login/Login";
import Register from "./pages/register/Register";
import PractitionerList from "./pages/practtioner/PractitionerList";
import PractitionerCreate from "./pages/practtioner/PractitionerCreate";
import PractitionerUpdate from "./pages/practtioner/PractitionerUpdate";

import "./App.css";
import { jwtInterceptorProvider } from "./axios/jwt.interceptor";

function App() {
  jwtInterceptorProvider();
  const dispatch = useDispatch();

  dispatch(setIsUserLoggedIn(getUserLoginFromLocalStorage()));
  dispatch(setId(getUserIdFromLocalStorage()));

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/practitioner" element={<AuthRoute />}>
          <Route path="/practitioner" element={<PractitionerList />} />
          <Route path="/practitioner/add" element={<PractitionerCreate />} />
          <Route
            path="/practitioner/update/:id"
            element={<PractitionerUpdate />}
          />
        </Route>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/practitioner" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1> Page not found </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
