import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface RoleRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

function RoleRoute({ element, allowedRoles }: RoleRouteProps) {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; 
  const role = user?.role;

  // Nếu chưa login
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return element;
}

export default RoleRoute;
