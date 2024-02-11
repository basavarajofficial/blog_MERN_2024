import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function OnlyPrivatePrivateRoute() {
    const { currentUser} = useSelector(state => state.user);
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to={'/home'} />
}

export default OnlyPrivatePrivateRoute;