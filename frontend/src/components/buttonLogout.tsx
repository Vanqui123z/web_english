import React from "react";
import { useNavigate } from "react-router-dom"; // nếu muốn redirect
// import Cookies from 'js-cookie'; // nếu token lưu trong cookie

interface LogoutButtonProps {
  redirectTo?: string; 
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ redirectTo = "/login" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(redirectTo);
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
