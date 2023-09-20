/* eslint-disable */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Room from './components/Room'
import { CustomRoom } from './components/CustomRoom';
import { OrbitControls, Html, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { useState, useRef, useEffect } from 'react';
import { useControls, button, buttonGroup, folder } from 'leva'

export default function App() {

  const [view2D, setView2D] = useState(false);

  const toggleView = (value: boolean) => {
    setView2D(value);
  };




  var roomWidth = 15;
  var roomHeight = 5;
  var roomDepth = 8;

  const customProps = {
    wallColor: '#00ff00',
    floorColor: '#ff0000',
    wallThickness: 0.3,
  };

  const Scene = () => {
    const cameraPosition = view2D ? new Vector3(0, 15, 0) : new Vector3(0, 15, 15);

    const controlsEnabled = !view2D;
    const { camera } = useThree();

    useEffect(() => {
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      camera.lookAt(new Vector3(0, 0, 0));
    }, [camera, cameraPosition]);

    return (
      <>
        <Text
          position={[0, 1, 0]}
          fontSize={1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {camera.position}
        </Text>

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

        <orthographicCamera position={camera.position} />


        {controlsEnabled && <OrbitControls />}
      </>
    );
  };


  const { width, depth, height ,colorFloor,colorWall,wallThickness} = useControls({
    toggleGroup: buttonGroup({
      label: 'Toggle View',
      opts: {
        '2D': () => toggleView(true),
        '3D': () => toggleView(false),
      }
    }),
    setDimensions: folder(
      {
        width: roomWidth,
        depth: roomDepth,
        height: roomHeight,
      }
    ),
    setColors: folder(
      {
        colorFloor: customProps.floorColor,
        colorWall: customProps.wallColor,
      }
    ),
    wallThickness:customProps.wallThickness,
  });

  roomWidth = width;
  roomDepth = depth;
  roomHeight = height;

  customProps.floorColor=colorFloor;
  customProps.wallColor=colorWall;

  customProps.wallThickness=wallThickness;

  return (
    <Canvas camera={{ fov: 45, near: 0.1, far: 1000 }}>
      <Scene />
    </Canvas>


  );
}
