import { useCurrentUser } from "@/features/auth/hooks";
import { Link } from "react-router";

export default function Header() {
    const currentUser = useCurrentUser();
    return (
        <div>
            {currentUser ? (
                <p>{currentUser.email}</p>
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
