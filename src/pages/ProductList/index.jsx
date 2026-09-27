import { useProductLoading, useProductList } from "@/features/product";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "@/services/product";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";

export default function ProductList() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const products = useProductList();
    const loading = useProductLoading();
    const hasMore = useSelector((state) => state.product.hasMore);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "200px",
    });

    useEffect(() => {
        dispatch(getList({ limit: 20, page }));
    }, [dispatch, page]);

    useEffect(() => {
        if (inView && !loading && hasMore) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPage((currentPage) => currentPage + 1);
        }
    }, [inView, loading, hasMore]);

    return (
        <>
            <Helmet>
                <title>Products List</title>
                <meta
                    name="description"
                    content="Description of products list"
                />
            </Helmet>
            
            <h1>Product List</h1>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>

            {hasMore && (
                <div
                    ref={ref}
                    style={{ padding: "10px 0", textAlign: "center" }}
                >
                    {loading && <div>Đang tải...</div>}
                </div>
            )}

            {!hasMore && <p>Đã hết danh sách</p>}
        </>
    );
}
