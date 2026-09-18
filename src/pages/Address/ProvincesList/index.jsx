import { useGetProvincesQuery } from "@/features/address/addressSlice";
import { Link } from "react-router";

export default function ProvincesList() {
    const { isLoading, data } = useGetProvincesQuery();
    return (
        <>
            <div>
                <Link to="/address/provinces2">List 2</Link>
                <Link to="/products">Product</Link>

                <h1>Provinces list</h1>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <ul>
                        {data?.map((province) => (
                            <li key={province.province_id}>{province.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
