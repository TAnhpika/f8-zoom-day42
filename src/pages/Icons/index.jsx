import Button from "@/components/Button";
import { faChevronLeft, faChevronRight, faLink } from "@fortawesome/free-solid-svg-icons";

export default function Icons() {
    return (
        <div>
            <h1>Icons</h1>
            <Button icon={faLink}>Button 1</Button>
            <Button leftIcon={faLink}>Button 2</Button>
            <Button rightIcon={faChevronRight}>Button 3</Button>
            <Button leftIcon={faChevronLeft} rightIcon={faChevronRight}>Button 4</Button>
        </div>
    );
}
