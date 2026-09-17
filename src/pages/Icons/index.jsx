import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icons() {
    return (
        <div>
            <h1>Icons</h1>
            <button
                style={{
                    fontSize: 20,
                    color: "blue",
                }}
            >
                Click me!
            </button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <FontAwesomeIcon icon={faGoogle} />

            <FontAwesomeIcon icon={faHeart} beat />
        </div>
    );
}
