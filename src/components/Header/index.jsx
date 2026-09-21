import { useCurrentUser } from "@/features/auth/hooks";

export default function Header() {
    const currentUser = useCurrentUser()
    return (
        <div>
            <h1>Header</h1>
            {currentUser ? (
                <p>{currentUser.email}</p>
            ) : (
                <div>
                    <button>Sign in</button>
                    <button>Sign up</button>
                </div>
            )}
        </div>
    );
}
