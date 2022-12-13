import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  getUserIdFromLocalStorage,
  getUserLoginFromLocalStorage,
} from "./utils/localstorage.util";

import AuthRoute from "./hoc/AuthRoute";
import { setId, setIsUserLoggedIn } from "./reducers";

import { Login } from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ToastPositions } from "./enum/toast.enum";
import { jwtInterceptorProvider } from "./axios/jwt.interceptor";
import PractitionerList from "./pages/practtioner/PractitionerList";
import PractitionerUpdate from "./pages/practtioner/PractitionerUpdate";
import PractitionerCreate from "./pages/practtioner/PractitionerCreate";
import ToastNotification from "./components/toastNotification/ToastNotification";

import {
  LOGIN,
  PRACTITIONER,
  PRACTITIONER_CREATE,
  PRACTITIONER_UPDATE,
  REGISTER,
} from "./constants";

import "./App.css";

function App() {
  jwtInterceptorProvider();
  const dispatch = useDispatch();

  const toastList = useSelector(
    (state: RootState) => state.toast.toastList
  );

  dispatch(setIsUserLoggedIn(getUserLoginFromLocalStorage()));
  dispatch(setId(getUserIdFromLocalStorage()));

  return (
    <>
    <ToastNotification  toastList={toastList} position={ToastPositions.topRight} />
    <BrowserRouter basename="/">
      <Routes>
        <Route path={PRACTITIONER} element={<AuthRoute />}>
          <Route path={PRACTITIONER} element={<PractitionerList />} />
          <Route path={PRACTITIONER_CREATE} element={<PractitionerCreate />} />
          <Route
            path={`${PRACTITIONER_UPDATE}/:id`}
            element={<PractitionerUpdate />}
          />
        </Route>
        <Route path="/" element={<Navigate to={LOGIN} />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path="*" element={<h1> Page not found </h1>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
