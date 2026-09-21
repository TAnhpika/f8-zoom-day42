import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { setCurrentUser, useCurrentUser } from "@/features/auth";
import * as authService from "@/services/auth";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useCurrentUser();

    const handleLogout = async () => {
        try {
            await authService.logout();
            localStorage.clear();
            dispatch(setCurrentUser(null));
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {currentUser ? (
                <div>
                    <p>{currentUser.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/login">Sign in</Link>
                    <br />
                    <Link to="/register">Sign up</Link>
                </div>
            )}
        </div>
    );
}
