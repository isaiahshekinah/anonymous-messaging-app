import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function AuthGuard() {

    const { loggedIn, loading } = useUserContext();


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!loggedIn) {
        return (
            <Navigate to="/login" replace />
        )
    }

    return <Outlet />;
}