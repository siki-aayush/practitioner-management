import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUserLoginFromLocalStorage } from "../../utils/localstorage.util";
import {
  UserOutlined,
  LoginOutlined,
  MenuOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { setIsUserLoggedIn } from "../../reducers";
import { LOGIN, PRACTITIONER, PRACTITIONER_CREATE } from "../../constants";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["practitioners"]}
      overflowedIndicator={<MenuOutlined />}
      className="navbar"
    >
      <Menu.Item key="add-practitioner" icon={<UserAddOutlined />}>
        <Link to={PRACTITIONER_CREATE}> Add Practitioner </Link>
      </Menu.Item>
      <Menu.Item
        key="practitioners"
        icon={<UserOutlined />}
        className="practitionerChild"
      >
        <Link to={PRACTITIONER}> Practitioner </Link>
      </Menu.Item>
      <Menu.Item
        key="login"
        icon={<LoginOutlined />}
        style={{ marginLeft: "auto" }}
      >
        <span
          onClick={() => {
            clearUserLoginFromLocalStorage();
            dispatch(setIsUserLoggedIn(false));
            navigate(LOGIN);
          }}
        >
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
