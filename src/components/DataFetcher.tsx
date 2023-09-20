import { Text } from '@react-three/drei';
import React, { useState, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const ENDPOINT = 'https://floorplanner.config.mercura.dk/'

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
                const url = ENDPOINT + `api/part/${myID}`;
                const response = await fetch(url);
                const result: DataID = JSON.parse(await response.text());
                setData(result);
                setLoading(false);
                console.log('data:', result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchDataID('643');
    }, []);


    const GLBModel = (url: any) => {
        console.log(url.url)
        const gltf = useLoader(GLTFLoader, ENDPOINT + url.url);
        return <primitive object={gltf.scene} />;
    };

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
            ) : (
                // <GLBModel url={data?.part.model_3d} />
                <></>
            )}
        </>
    );
};

export default DataFetcher;
