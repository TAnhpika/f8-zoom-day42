import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
    faHeart,
    faMagnifyingGlass,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icons() {
    // Fake
    let loading = true;

    return (
        <div>
            <h1>Icons</h1>
            <button
                style={{
                    fontSize: 20,
                    color: "red",
                    "--fa-animation-duration": "1s",
                }}
            >
                <FontAwesomeIcon
                    spin={loading}
                    icon={loading ? faSpinner : faGoogle}
                />
                Click me!
            </button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <FontAwesomeIcon icon={faHeart} beat />
        </div>
    );
}
