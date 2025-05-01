import { Navigate, Outlet } from "react-router-dom";
import { usefirebase } from "../../context/Firebase";


const ProtectedRoute = () => {
  const { isLoggedIn } = usefirebase();


  if (!isLoggedIn) {
    // alert("You must log in first to access this page.")
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;