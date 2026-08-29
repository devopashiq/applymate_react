import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const protectedRoute = () => {
  const {user,loading} = useAuth();
    if (loading) {
        return <h1>loading</h1>;
    }
  
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default protectedRoute;
