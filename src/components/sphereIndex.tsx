'use client';

import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import {
  Canvas,
  ThreeElements,
  extend,
  useFrame,
  useLoader,
  useThree,
} from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Effects,
  useTexture,
  Stars,
} from '@react-three/drei';
import { LUTPass, LUTCubeLoader } from 'three-stdlib';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

// function Sphere(props: ThreeElements['mesh']) {
//   return (
//     <mesh {...props}>
//       <sphereGeometry args={[1, 64, 64]} />
//       <meshPhysicalMaterial
//         clearcoat={1}
//         clearcoatRoughness={0}
//         roughness={0}
//         metalness={0.5}
//       />
//     </mesh>
//   );
// }

function Sphere({ position, sphere, transmission, color, opacity }: any) {
  return (
    <mesh position={position}>
      <sphereGeometry args={sphere} />
      <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={0}
        roughness={0}
        metalness={0.4}
        iridescence={1}
        transmission={transmission}
        color={color}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

const SphereIndex = () => {
  return (
    <Canvas
      frameloop="demand"
      camera={{ fov: 30, near: 0.1, far: 50, position: [0, 0, 40] }}
      style={{ height: '100vh' }}
    >
      <ambientLight />
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[5, 15, 10]}
      />
      <Sphere
        sphere={[10, 64, 64]}
        position={[0, 0, 0]}
        transmission={0.3}
        color={'red'}
        opacity={1}
      />
      <Sphere
        sphere={[11, 64, 64]}
        position={[0, 0, 0]}
        transmission={0.5}
        color={'blue'}
        opacity={0.6}
      />
      <Sphere
        sphere={[12, 64, 64]}
        position={[0, 0, 0]}
        transmission={0.7}
        color={'green'}
        opacity={0.4}
      />
      <Sphere
        sphere={[13, 64, 64]}
        position={[0, 0, 0]}
        transmission={0.9}
        color={'yellow'}
        opacity={0.3}
      />
      {/* <Environment preset="dawn" background blur={0.6} /> */}
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
        // background
      />
      {/* <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.1}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      /> */}
      {/* <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
      </EffectComposer> */}
      <OrbitControls />
    </Canvas>
  );
};

export default SphereIndex;
