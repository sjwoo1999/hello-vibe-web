import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Box(props) {
  const mesh = useRef();
  const { position, rotationSpeed } = props;

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += rotationSpeed;
    }
  });

  return (
    <mesh {...props} ref={mesh} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshLambertMaterial color={0xffffff} />
    </mesh>
  );
}

export default function Experience() {
  const boxes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        position: [
          3 * (Math.random() * 2 - 1),
          13 * (Math.random() * 2 - 1),
          4 * (Math.random() * 2 - 1),
        ],
        rotationSpeed: Math.random() * 0.01 + 0.005,
      });
    }
    return temp;
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 3, 2]} />
      {boxes.map((box, i) => (
        <Box key={i} {...box} />
      ))}
    </Canvas>
  );
}
