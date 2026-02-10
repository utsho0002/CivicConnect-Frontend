import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {

  const { user, loading, roleLoading,userStatus  } = useContext(AuthContext);
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user || !userStatus=='active' ) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
