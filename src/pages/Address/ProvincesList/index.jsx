import {
    useGetProvinceByIdQuery,
    useGetProvincesQuery,
} from "@/features/address/addressSlice";

export default function ProvincesList() {
    const { isLoading, data } = useGetProvincesQuery();
    const { data: idProvince } = useGetProvinceByIdQuery(1);
    
    return (
        <>
            <div>
                <h3>First province:</h3>
                <div>{idProvince?.data.name}</div>
                <h1>Provinces list</h1>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <ul>
                        {data?.data.map((province) => (
                            <li key={province.province_id}>{province.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
