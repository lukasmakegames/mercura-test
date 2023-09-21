import { Gltf, Text } from '@react-three/drei';
import { useState, useEffect } from 'react';

interface DataID {
    error: string,
    part: {
        id: number,
        active: number,
        name: string,
        description: string | null,
        number: number,
        price: number,
        model: any,
        picture_2d: any | null,
        picture_3d: any | null,
        model_3d: any | null,
        part_type_id: number,
        deleted_at: string | null,
        created_at: string | null,
        updated_at: string | null
    },
    deleted: boolean,
    categories: Array<any> | null,
    dynamicProperties: Array<any> | null,
    properties: Array<any> | null
}

const DataFetcher = () => {
    const [data, setData] = useState<DataID | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataID = async (myID: string) => {
            try {
                const url = `/api/part/${myID}`;
                const response = await fetch(url);
                console.log(response)
                const result: DataID = JSON.parse(await response.text());
                setData(result);
                setLoading(false);
                // console.log('data:', result);

                console.log(result?.part.model_3d)

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchDataID('643');
    }, []);




    return (
        <>
            {loading ? (
                <Text
                    position={[0, 1, 0]}
                    fontSize={1}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    LOADING DATA FROM API...
                </Text>
            ) :
                (
                    <Gltf src={"storage/" + data?.part.model_3d} receiveShadow castShadow />
                )}
        </>
    );
};

export default DataFetcher;
