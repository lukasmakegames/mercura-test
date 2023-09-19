import React from 'react';
import { TextureLoader,RepeatWrapping  } from 'three';

interface RoomProps {
    width: number;
    height: number;
    depth: number;
}

const Room: React.FC<RoomProps> = ({ width, height, depth }) => {
    const textureLoader = new TextureLoader();

    const floorTexture = textureLoader.load('floor.jfif');
    floorTexture.wrapS = floorTexture.wrapT = RepeatWrapping;
    floorTexture.repeat.set(width / 2, depth / 2);

    const wallTexture = textureLoader.load('wall.jfif'); 
    wallTexture.wrapS = wallTexture.wrapT = RepeatWrapping;
    wallTexture.repeat.set(1, height / 2);


    return (
        <>
            {/* Floor */}
            <mesh position={[0, -0.05, 0]} receiveShadow >
                <boxGeometry args={[width, 0.01, depth]} />
                <meshStandardMaterial map={floorTexture} />
            </mesh>

            {/* Walls */}
            <mesh position={[0, height / 2, -depth / 2]} receiveShadow  castShadow>
                <boxGeometry args={[width, height, 0.3]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>
            <mesh position={[width / 2, height / 2, 0]} receiveShadow  castShadow>
                <boxGeometry args={[0.3, height, depth]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>
            <mesh position={[0, height / 2, depth / 2]} >
                <boxGeometry args={[width, height, 0.3]} />
                <meshStandardMaterial map={wallTexture} transparent opacity={0.3}/>
            </mesh>
            <mesh position={[-width / 2, height / 2, 0]} receiveShadow  castShadow>
                <boxGeometry args={[0.3, height, depth]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>
        </>
    );
};

export default Room;