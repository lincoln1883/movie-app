import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("currentUser")
  return user ? <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoute;