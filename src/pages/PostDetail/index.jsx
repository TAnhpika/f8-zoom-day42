import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import slugify from "slugify";

import fakeData from "./fakeData";
import css from "./PostDetail.module.scss";
import { useLocation } from "react-router";

export default function PostDetail() {
    const [indexList, setIndexList] = useState([]);
    const contentRef = useRef();
    const location = useLocation();

    useEffect(() => {
        if (!fakeData) return;

        const indexList = [];
        const headings =
            contentRef.current.querySelectorAll("h2, h3, h4, h5, h6");

        headings.forEach((heading, index) => {
            const Tag = heading.nodeName.toLowerCase();
            const originalText = heading.textContent;
            const slug = slugify(originalText, {
                lower: true,
                locale: "vi",
                remove: /[*+~.()'"!?:@]/g,
            }).replace(/^[\d-]+/, "");
            heading.id = slug;

            // share khi click các post heading
            const link = document.createElement("a");
            link.href = `#${slug}`;
            link.textContent = originalText;

            heading.innerHTML = "";
            heading.appendChild(link);

            indexList.push(
                <Tag key={index} className={Tag}>
                    <a href={`#${slug}`}>{originalText}</a>
                </Tag>,
            );
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIndexList(indexList);
        // thực tế khi gọi API cần điền để update menu theo
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fakeData]);

    useEffect(() => {
        if (!indexList.length) return;

        const target = location.hash && document.querySelector(location.hash);
        if (target) {
            target.scrollIntoView();
        }
    }, [indexList.length, location.hash]);

    return (
        <div className={css.container}>
            <h1>Post detail</h1>
            <div className={css.inner}>
                {/* Content */}
                <div
                    ref={contentRef}
                    className={css.content}
                    dangerouslySetInnerHTML={{
                        // __html: fakeData
                        __html: DOMPurify.sanitize(fakeData),
                    }}
                ></div>

                {/* Index */}
                {indexList.length && (
                    <div className={css.index}>{indexList}</div>
                )}
            </div>
        </div>
    );
}
