import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import { Loading } from "./Loading";

export const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loading/>
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};