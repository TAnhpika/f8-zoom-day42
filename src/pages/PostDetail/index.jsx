import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import slugify from "slugify";

import fakeData from "./fakeData";
import styles from "./PostDetail.module.scss";
import { useLocation } from "react-router";

export default function PostDetail() {
    const [indexList, setIndexList] = useState([]);
    const contentRef = useRef();
    const location = useLocation();

    useEffect(() => {
        if (!fakeData) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // gỡ active trc khi gán mới
                    const oldActive = document.querySelector(
                        `#index-list a.${styles.active}`,
                    );
                    if (oldActive) {
                        oldActive.classList.remove(styles.active);
                    }

                    const indexTarget = document.querySelector(
                        `#index-list a[href="#${entry.target.id}"]`,
                    );
                    if (indexTarget) {
                        indexTarget.classList.add(styles.active);
                    }
                }
            });
        });

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

            observer.observe(heading);

            indexList.push(
                <Tag key={index} className={Tag}>
                    <a href={`#${slug}`}>{originalText}</a>
                </Tag>,
            );
        });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIndexList(indexList);

        return () => {
            observer.disconnect();
        };
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
        <div className={styles.container}>
            <h1>Post detail</h1>
            <div className={styles.inner}>
                {/* Content */}
                <div
                    ref={contentRef}
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                        // __html: fakeData
                        __html: DOMPurify.sanitize(fakeData),
                    }}
                ></div>

                {/* Index */}
                {indexList.length && (
                    <div id="index-list" className={styles.index}>
                        {indexList}
                    </div>
                )}
            </div>
        </div>
    );
}
