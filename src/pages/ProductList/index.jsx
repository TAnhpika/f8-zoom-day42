import {
    useFetchProductList,
    useProductLoading,
    useProductList,
} from "@/features/product";
import { Link } from "react-router";

export default function ProductList() {
    useFetchProductList();
    const products = useProductList();
    const loading = useProductLoading();

    return (
        <>
            <h1>Product List</h1>
            <Link to="/address/provinces">List 1</Link>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>{product.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
