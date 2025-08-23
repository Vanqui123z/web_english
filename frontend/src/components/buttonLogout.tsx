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
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
