import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/index";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
  };
  return (
    <div className="navbar">
      <button onClick={logout}>Выйти</button>
    </div>
  );
};

export default Navbar;
