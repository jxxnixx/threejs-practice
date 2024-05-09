"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  elements,
  period1,
  period2,
  period3,
  period4,
  period5,
  period6,
  period7,
} from "./elements.js";

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
        <div className='element' style={{ color: color, fontSize: "x-small" }}>
          <div className='number'>{element.number}</div>
          <div className='symbol'>{element.symbol}</div>
          <div className='details'>
            {element.name}
            <br />
            {element.weight}
          </div>
        </div>
      </Html>
    </mesh>
  );
}

function SmallPlane({ position, element, plane, color, onClick }: any) {
  return (
    <mesh
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(element);
      }}>
      <planeGeometry args={plane} />

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
        <div className='element' style={{ color: color, fontSize: "x-small" }}>
          <div className='number'>{element.number}</div>
          <div className='symbol'>{element.symbol}</div>
          <div className='details'>
            {element.name}
            <br />
            {element.weight}
          </div>
        </div>
      </Html>
    </mesh>
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

function BigSphere({
  period,
  smaillRadius,
  bigRadius,
  color,
  onElementClick,
}: any) {
  const { sphere } = createSpheresFromData({ data: period, bigRadius });

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
        <SmallPlane
          key={index}
          element={element}
          position={sphere[index]}
          plane={[smaillRadius * 2, smaillRadius * 4]}
          color={color}
          onClick={onElementClick}
        />
      ))}
    </>
  );
}

function PeriodicTable() {
  const [clickedElement, setClickedElement] = useState(null);

  const handleElementClick = (element: any) => {
    setClickedElement(element);
  };

  return (
    <Canvas
      frameloop='demand'
      camera={{ fov: 300, near: 0.1, far: 5000, position: [0, 0, 2000] }}
      style={{ height: "100vh" }}>
      <ambientLight />
      <OrbitControls />
      <BigSphere
        period={period1}
        smaillRadius={20}
        bigRadius={100}
        color={"red"}
        onElementClick={handleElementClick}
      />
      <BigSphere
        period={period2}
        smaillRadius={20}
        bigRadius={200}
        color={"red"}
      />
      <BigSphere
        period={period3}
        smaillRadius={20}
        bigRadius={300}
        color={"orange"}
      />
      <BigSphere
        period={period4}
        smaillRadius={20}
        bigRadius={400}
        color={"yellow"}
      />
      <BigSphere
        period={period5}
        smaillRadius={20}
        bigRadius={500}
        color={"green"}
      />
      <BigSphere
        period={period6}
        smaillRadius={20}
        bigRadius={600}
        color={"blue"}
      />
      <BigSphere
        period={period7}
        smaillRadius={20}
        bigRadius={700}
        color={"purple"}
      />

      {/* {clickedElement && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[30, 64, 64]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0}
            roughness={0}
            metalness={0.4}
            iridescence={1}
            color={clickedElement.color}
            transparent
          />
          <Html position={[0, 0, 0]} center>
            <div className='element' style={{ color: clickedElement.color, fontSize: "x-small" }}>
              <div className='number'>{clickedElement.number}</div>
              <div className='symbol'>{clickedElement.symbol}</div>
              <div className='details'>
                {clickedElement.name}
                <br />
                {clickedElement.weight}
              </div>
            </div>
          </Html>
        </mesh>
      )} */}
    </Canvas>
  );
}

export default PeriodicTable;
