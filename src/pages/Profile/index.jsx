import { useCurrentUser } from "@/features/auth";

export default function Profile() {
    const currentUser = useCurrentUser();

    return <div>{JSON.stringify(currentUser)}</div>;
}
