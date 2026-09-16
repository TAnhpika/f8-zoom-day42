import { useFetchProductList, useProductList } from "@/features/product/hooks";

export default function ProductList() {
    useFetchProductList();
    const products = useProductList();

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
}
