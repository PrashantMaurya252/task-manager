import { mainContext } from "@/Context/context";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { token, isLoggedIn, setLoggedIn, setToken, setUser } =
    useContext(mainContext);
  // const navigate = useNavigation()
  // const token = localStorage.getItem('token')
  const navigate = useNavigate();
  let location = useLocation();
  let pathname = location.pathname;
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    const currentUser = localStorage.getItem("user");
    if (currentToken && currentUser) {
      setToken(currentToken);
      setUser(currentUser);
    }
    if (pathname === "/" && currentToken) {
      navigate("/task-list");
    } else if (pathname !== "/" && !currentToken) {
      navigate("/");
    }
  }, [pathname, token]);
  return <div>{children}</div>;
};

export default ProtectRoute;
