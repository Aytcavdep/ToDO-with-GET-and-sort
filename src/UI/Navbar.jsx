import { useContext } from "react";
import { AuthContext } from "../context/index";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  };
  return isAuth ? (
    <div className="navbar">
      <Button type="primary" icon={<LoginOutlined />} onClick={logout}>
        Выйти
      </Button>
    </div>
  ) : (
    ""
  );
};

export default Navbar;
