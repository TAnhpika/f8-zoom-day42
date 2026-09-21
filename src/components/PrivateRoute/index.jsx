import { useCurrentUser } from "@/features/auth";
import { Navigate, Outlet, useLocation } from "react-router";

export default function PrivateRoute() {
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();

    if (!currentUser) {
        return <Navigate to={`/login?continue=${encodeURIComponent(pathname)}`} />;
    }

    return <Outlet />;
}
