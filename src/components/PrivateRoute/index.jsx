import { useCurrentUser } from "@/features/auth";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

export default function PrivateRoute() {
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const fetching = useSelector((state) => state.auth.fetching);

    if (fetching && !currentUser) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return (
            <Navigate to={`/login?continue=${encodeURIComponent(pathname)}`} />
        );
    }

    return <Outlet />;
}
