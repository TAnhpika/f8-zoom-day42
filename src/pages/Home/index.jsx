import { Link } from "react-router";

export default function Home() {
    return (
        <div>
            <h1>Home page</h1>
            <Link to={"/counter"}>Counter</Link>
        </div>
    );
}
