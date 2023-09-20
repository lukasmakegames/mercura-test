import { Component } from 'react'
import { Text } from '@react-three/drei';
import { Room, RoomProps } from './Room'


export interface CustomRoomProps extends RoomProps {
    wallColor: number;
    floorColor: number;
  }

export class CustomRoom extends Room {
    private wallColor: any;
    private floorColor: any;

    constructor(props: CustomRoomProps) {
        super(props);
        this.setColors(props.wallColor,props.floorColor);
    }
    setColors(wallColor: number, floorColor: number) {
        this.wallColor=wallColor;
        this.floorColor=floorColor;
    }
    override render() {
        return (<>

            <Text
      position={[0, 1, 0]}
      fontSize={1}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {this.width}
    </Text>  

            {/* Floor */}
            <mesh position={[0, -0.05, 0]} receiveShadow >
                <boxGeometry args={[this.width, 0.01, this.depth]} />
                <meshStandardMaterial map={this.floorTexture} color={this.floorColor}/>
            </mesh>

            {/* Walls */}
            <mesh position={[0, this.height / 2, -this.depth / 2]} receiveShadow castShadow>
                <boxGeometry args={[this.width, this.height, 0.3]} />
                <meshStandardMaterial map={this.wallTexture} color={this.wallColor}/>
            </mesh>
            <mesh position={[this.width / 2, this.height / 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[0.3, this.height, this.depth]} />
                <meshStandardMaterial map={this.wallTexture} color={this.wallColor}/>
            </mesh>
            <mesh position={[0, this.height / 2, this.depth / 2]} >
                <boxGeometry args={[this.width, this.height, 0.3]} />
                <meshStandardMaterial map={this.wallTexture} transparent opacity={0.3} color={this.wallColor}/>
            </mesh>
            <mesh position={[-this.width / 2, this.height / 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[0.3, this.height, this.depth]} />
                <meshStandardMaterial map={this.wallTexture} color={this.wallColor}/>
            </mesh>
        </>);
    }
}