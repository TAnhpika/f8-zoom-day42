import { useGetCurrentUserQuery } from "@/features/auth/authSlice";

export default function AuthProvider() {
    useGetCurrentUserQuery();
    return null;
}
