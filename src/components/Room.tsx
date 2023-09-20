import { TextureLoader, RepeatWrapping } from 'three';
import { Text } from '@react-three/drei';
import { Component } from 'react';

export interface RoomProps {
    width: number;
    height: number;
    depth: number;
}


export class Room extends Component<RoomProps> {
    private textureLoader = new TextureLoader();
    protected floorTexture: any;
    protected wallTexture: any;
    protected width: any;
    protected height: any;
    protected depth: any;

    constructor(props: RoomProps) {
        super(props);
        this.setDimensions(props.width, props.height, props.depth);
        this.setTextures();

    }

    setDimensions(width: number, height: number, depth: number) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    setTextures() {
        this.floorTexture = this.textureLoader.load('floor.jfif');
        this.floorTexture.wrapS = this.floorTexture.wrapT = RepeatWrapping;
        this.floorTexture.repeat.set(this.width / 2, this.depth / 2);

        this.wallTexture = this.textureLoader.load('wall.jfif');
        this.wallTexture.wrapS = this.wallTexture.wrapT = RepeatWrapping;
        this.wallTexture.repeat.set(1, this.height / 2);

    }
    render() {
        return (<>

            {/* <Text
      position={[0, 1, 0]}
      fontSize={1}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {this.width}
    </Text>  */}

            {/* Floor */}
            <mesh position={[0, -0.05, 0]} receiveShadow >
                <boxGeometry args={[this.width, 0.01, this.depth]} />
                <meshStandardMaterial map={this.floorTexture} />
            </mesh>

            {/* Walls */}
            <mesh position={[0, this.height / 2, -this.depth / 2]} receiveShadow castShadow>
                <boxGeometry args={[this.width, this.height, 0.3]} />
                <meshStandardMaterial map={this.wallTexture} />
            </mesh>
            <mesh position={[this.width / 2, this.height / 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[0.3, this.height, this.depth]} />
                <meshStandardMaterial map={this.wallTexture} />
            </mesh>
            <mesh position={[0, this.height / 2, this.depth / 2]} >
                <boxGeometry args={[this.width, this.height, 0.3]} />
                <meshStandardMaterial map={this.wallTexture} transparent opacity={0.3} />
            </mesh>
            <mesh position={[-this.width / 2, this.height / 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[0.3, this.height, this.depth]} />
                <meshStandardMaterial map={this.wallTexture} />
            </mesh>
        </>);
    }


}
export default Room;