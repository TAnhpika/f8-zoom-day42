import fakeData from "./fakeData";
import DOMPurify from 'dompurify';

export default function PostDetail() {
    return (
        <div>
            <h1>Post detail</h1>
            <div
                dangerouslySetInnerHTML={{
                    // __html: fakeData
                    __html: DOMPurify.sanitize(fakeData)
                }}
            ></div>
        </div>
    );
}
