import { Login } from "./pages/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  getUserIdFromLocalStorage,
  getUserLoginFromLocalStorage,
} from "./utils/localstorage.util";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import AuthRoute from "./hoc/AuthRoute";
import { RootState } from "./redux/store";
import Register from "./pages/register/Register";
import { setId, setIsUserLoggedIn } from "./reducers";
import PractitionerCreate from "./pages/practtioner/PractitionerCreate";
import PractitionerUpdate from "./pages/practtioner/PractitionerUpdate";

import "./App.css";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  // const isLoggedIn = getUserLoginFromLocalStorage();
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
          <Route path="/practitioner/add" element={<PractitionerCreate />} />
          <Route
            path="/practitioner/update/:id"
            element={<PractitionerUpdate />}
          />
        </Route>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1> Page not found </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
