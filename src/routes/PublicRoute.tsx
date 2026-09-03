import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/auth"


const PublicRoute=()=>{

     const {user,loading} = useAuth();
    if (loading) {
        return <h1>loading</h1>;
    }
  
    if(user){
        return <Navigate to='/dashboard' replace/>
    }
    return <Outlet></Outlet>
}





export default PublicRoute
