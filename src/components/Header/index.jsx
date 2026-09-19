import { useGetCurrentUserQuery } from "@/features/auth/authSlice";

export default function Header() {
    const { data, isLoading } = useGetCurrentUserQuery();
    if (isLoading) return null;

    console.log(data);
    
    return (
        <div>
            <h1>Header</h1>
            {isLoading ? null : data ? (
                <p>{data.email}</p>
            ) : (
                <div>
                    <button>Sign in</button>
                    <button>Sign up</button>
                </div>
            )}
        </div>
    );
}
