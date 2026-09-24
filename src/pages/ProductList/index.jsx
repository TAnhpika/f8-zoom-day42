import { useProductLoading, useProductList } from "@/features/product";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { getList } from "@/services/product";

export default function ProductList() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "200px",
    });

    const products = useProductList();
    const loading = useProductLoading();

    useEffect(() => {
        if (!hasMore || loading) return;
        if (!inView) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage((prev) => prev + 1);
    }, [hasMore, inView, loading]);

    useEffect(() => {
        dispatch(getList({ limit: 10, page }));
    }, [dispatch, page]);

    useEffect(() => {
        if (!loading && products.length > 0 && products.length % 10 !== 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasMore(false);
        }
    }, [loading, products]);

    return (
        <>
            <h1>Product List</h1>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
            {loading && <div>Loading...</div>}

            {hasMore && (
                <div ref={ref} style={{ textAlign: "center", padding: "20px" }}>
                    {loading ? "Đang tải..." : "Cuộn để xem thêm"}
                </div>
            )}
            {!hasMore && <p>Đã hết dữ liệu</p>}
        </>
    );
}
