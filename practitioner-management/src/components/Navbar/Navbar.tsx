import {
  ContactsOutlined,
  LoginOutlined,
  MenuOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { clearUserLoginFromLocalStorage } from "../../utils/localstorage.util";
import { useDispatch } from "react-redux";

import "./Navbar.css";
import { setIsUserLoggedIn } from "../../reducers";

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
        <Link to="/practitioner/add"> Add Practitioner </Link>
      </Menu.Item>
      <Menu.Item
        key="practitioners"
        icon={<ContactsOutlined />}
        className="testingChild"
      >
        <Link to="/practitioner"> Practitioner </Link>
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
            navigate("/login");
          }}
        >
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
