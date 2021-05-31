import * as THREE from "three";
import React, { useRef, useState, FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";

interface RingProps {
  ringArgs: number[];
  color: string;
}

function Ring(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.02;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={0.8}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {/* inner outer */}
      <ringGeometry args={props.ringArgs} />
      <meshStandardMaterial side={THREE.DoubleSide} color={props.color} />
    </mesh>
  );
}

const BackGround: FC = () => {
  const { height, width } = document.body.getBoundingClientRect();
  return (
    <div className="w-full h-screen fixed -z-999 bg-gray-100">
      <Canvas>
        <PerspectiveCamera
          makeDefault
          args={[100, width / height, 1, 1000]}
          position={[0, 30, 60]}
          // rotation={[0, 60, 0]}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Ring ringArgs={[15, 18, 30]} color="#edb017" position={[-30, 30, 20]} />
        <Ring ringArgs={[10, 15, 30]} color="#8B5CF6" position={[-30, 30, 20]} />
        {/* <gridHelper args={[100, 10]} /> */}
        {/* <axesHelper args={[10]} /> */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default BackGround;
