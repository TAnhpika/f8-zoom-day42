import { useProductLoading, useProductList } from "@/features/product";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "@/services/product";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductList() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const products = useProductList();
    const loading = useProductLoading();
    const hasMore = useSelector((state) => state.product.hasMore);

    useEffect(() => {
        dispatch(getList({ limit: 10, page }));
    }, [dispatch, page]);

    return (
        <>
            <h1>Product List</h1>

            <InfiniteScroll
                dataLength={products.length}
                next={() => {
                    if (!loading && hasMore) {
                        setPage((currentPage) => currentPage + 1);
                    }
                }}
                hasMore={hasMore}
                loader={<div>Đang tải...</div>}
                endMessage={<p>Đã hết danh sách</p>}
            >
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
}
