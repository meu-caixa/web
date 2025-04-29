import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/AuthProvider";
import { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" replace />;
};
