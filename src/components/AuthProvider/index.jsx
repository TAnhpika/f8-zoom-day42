import { useFetchCurrentUser } from "@/features/auth/hooks";

export default function AuthProvider() {
    useFetchCurrentUser();
    return null;
}
