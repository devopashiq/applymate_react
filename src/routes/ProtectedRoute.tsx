import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/auth";

const ProtectedRoute = () => {
  const {user,loading} = useAuth();
    if (loading) {
        return <h1>loading</h1>;
    }
  
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
