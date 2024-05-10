'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  useCursor,
  Image,
  Bounds,
  useBounds,
  PointerLockControls,
  FlyControls,
  DragControls,
  PivotControls,
  CameraControls,
  FaceControls,
} from '@react-three/drei';
import * as THREE from 'three';
import {
  elements,
  period1,
  period2,
  period3,
  period4,
  period5,
  period6,
  period7,
} from './elements.js';

function SmallSphere({ position, element, sphere, color }: any) {
  return (
    <mesh position={position}>
      <sphereGeometry args={sphere} />
      <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={0}
        roughness={0}
        metalness={0.4}
        iridescence={1}
        color={color}
        transparent
      />
      <Html position={[0, 0, 0]} center>
        <div className="element" style={{ color: color, fontSize: 'x-small' }}>
          <div className="number">{element.number}</div>
          <div className="symbol">{element.symbol}</div>
          <div className="details">
            {element.name}
            <br />
            {element.weight}
          </div>
        </div>
      </Html>
    </mesh>
  );
}

function SmallBox({ position, element, box, color, ...props }: any) {
  const image: any = useRef();
  const frame: any = useRef();

  const [hovered, setHovered] = useState(false);
  const [rnd] = useState(() => Math.random());

  useCursor(hovered);

  return (
    <group {...props}>
      <mesh
        position={position}
        name={element.symbol}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        scale={[1, 1, 0.05]}
      >
        <boxGeometry args={box} />

        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0}
          metalness={0.4}
          iridescence={1}
          color={color}
          transparent
        />

        {/* <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh> */}
        {/* <Image
          raycast={() => null}
          ref={image}
          position={position}
          url={'/image.png'}
        /> */}

        <Html position={[0, 0, 0]} center>
          <div
            className="element"
            style={{ color: color, fontSize: 'x-small' }}
          >
            <div className="number">{element.number}</div>
            <div className="symbol">{element.symbol}</div>
            <div className="details">
              {element.name}
              <br />
              {element.weight}
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function createSpheresFromData({ data, bigRadius }: any) {
  const targets: any = {
    sphere: [],
  };
  let index = 0;
  data.forEach((element: any) => {
    const phi = Math.acos(-1 + (2 * index) / data.length);
    const theta = Math.sqrt(data.length * Math.PI) * phi;
    const position = new THREE.Vector3().setFromSphericalCoords(
      bigRadius,
      phi,
      theta
    );
    targets.sphere.push(position);
    index++;
  });
  return targets;
}

function BigSphere({ period, smaillRadius, bigRadius, color }: any) {
  const { sphere } = createSpheresFromData({ data: period, bigRadius });

  const ref: any = useRef();
  const clicked: any = useRef();

  return (
    <>
      {period.map((element: any, index: any) => (
        //   <SmallSphere
        //     key={index}
        //     element={element}
        //     position={sphere[index]}
        //     sphere={[smaillRadius, 64, 64]}
        //     color={color}
        //   />
        <SmallBox
          key={index}
          element={element}
          position={sphere[index]}
          box={[smaillRadius * 2, smaillRadius * 4, 1]}
          color={color}
        />
      ))}
    </>
  );
}

function SelectToZoom({ children }: any) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        // e.stopPropagation(), e.delta <= 2 && api.get
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
}

function PeriodicTable() {
  return (
    <Canvas
      frameloop="demand"
      camera={{ fov: 300, near: 0.1, far: 5000, position: [0, 0, 1000] }}
      style={{ height: '100vh' }}
    >
      <ambientLight />
      <Suspense fallback={null}>
        <Bounds observe>
          <SelectToZoom>
            <BigSphere
              period={period1}
              smaillRadius={20}
              bigRadius={100}
              color={'red'}
            />
            <BigSphere
              period={period2}
              smaillRadius={20}
              bigRadius={200}
              color={'red'}
            />
            <BigSphere
              period={period3}
              smaillRadius={20}
              bigRadius={300}
              color={'orange'}
            />
            <BigSphere
              period={period4}
              smaillRadius={20}
              bigRadius={400}
              color={'yellow'}
            />
            <BigSphere
              period={period5}
              smaillRadius={20}
              bigRadius={500}
              color={'green'}
            />
            <BigSphere
              period={period6}
              smaillRadius={20}
              bigRadius={600}
              color={'blue'}
            />
            <BigSphere
              period={period7}
              smaillRadius={20}
              bigRadius={700}
              color={'purple'}
            />
          </SelectToZoom>
        </Bounds>
        <OrbitControls
          minAzimuthAngle={Math.PI / -20}
          maxAzimuthAngle={Math.PI / 20}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 1.9}
          zoomToCursor
        />
        {/* <DragControls /> */}
      </Suspense>
    </Canvas>
  );
}

export default PeriodicTable;
