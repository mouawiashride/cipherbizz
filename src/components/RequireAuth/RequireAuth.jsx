import {  Navigate, Outlet } from "react-router-dom";
import RequireAuthLogic from "./RequireAuthLogic";



const RequireAuth = ({ allowedRoles }) => {
    const {location ,role} = RequireAuthLogic();
    return  allowedRoles.includes(role)    ? <Outlet />  : (role==="guest" ? <Navigate to="/auth/login" state={{ from: location }} replace /> : <Navigate to="/" state={{ from: location }} replace /> )  ;
}

export default RequireAuth;
