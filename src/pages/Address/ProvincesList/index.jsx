import { useGetProvincesQuery } from "@/features/address/addressSlice";

export default function ProvincesList() {
    const { isLoading, data } = useGetProvincesQuery();
    return (
        <>
            <div>
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
