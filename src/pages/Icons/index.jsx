import Button from "@/components/Button";
import {
    faChevronLeft,
    faChevronRight,
    faLink,
} from "@fortawesome/free-solid-svg-icons";

export default function Icons() {
    let loading = true;

    return (
        <div>
            <h1>Icons</h1>
            <Button
                icon={faLink}
                loading={loading}
                onClick={() => alert("Clicked!")}
            >
                Button 1
            </Button>
            <Button leftIcon={faLink} disabled>
                Button 2
            </Button>
            <Button rightIcon={faChevronRight}>Button 3</Button>
            <Button leftIcon={faChevronLeft} rightIcon={faChevronRight}>
                Button 4
            </Button>
        </div>
    );
}
