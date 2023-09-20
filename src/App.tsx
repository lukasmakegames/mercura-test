/* eslint-disable */
import { Canvas, useFrame } from '@react-three/fiber'
import Room from './components/Room'
import { CustomRoom } from './components/CustomRoom';


export default function App() {
  const roomWidth = 15;
  const roomHeight = 5;
  const roomDepth = 8;

  const customProps = {
    wallColor: 0x00ff00,
    floorColor: 0xff0000,
  };

  return (
    <Canvas camera={{ position: [0, 10, 10] }} shadows>
      <ambientLight intensity={1.5} />
      <pointLight position={[0, 10, 10]} intensity={0.5} />
      <directionalLight intensity={1} position={[-10, 9, 2]}
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        />
      <CustomRoom width={roomWidth} height={roomHeight} depth={roomDepth} {...customProps} />
    </Canvas>
  );
}
