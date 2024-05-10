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

// TODO
// position 위치나 여러 정보들을 저장하는 객체 자체를 만들어서 출력하자
// 줌인, 줌아웃 시 모든 카드들이 화면상에 **거의 정면으로 보여야 함
// 구 크기 키워서 개발해보기
// 구 상에서 카드 위치 픽싱하는 거, 포지션 잡는 법 고민하기
// 커서 + 패럴랙스 확대 비율 고민하기, % 사용 + 좌표 결정 방법 고민
// 클릭 시 해당 객체 depth 출력 + 현재 depth 전역 관리(blur)
// blur 처리 방식 고민하기 - 대상 피사체 바로 뒤에 blur layer 까는 방식 느낌...? 2개 정도.. 음 카메라를 이동시킬건지 블러 레이어를 이동시킬건지 고민
// css3drenderer로 geometry 위의 html 객체에도 회전 등 효과 부여하기
// 상태관리 객체화/클래스화or함수화 jotai처럼 배열 안에 obj 만들고 그 안에서 상태관리 해도 됨. jotai는 three 객체도 가질 수 있을지도? 확인 ㄱㄱ
// geometry 지우고 DOM으로 대체

function PeriodicTable() {
  return (
    <Canvas
      frameloop="demand"
      camera={{
        fov: 300,
        near: 0.1,
        far: 5000,
        position: [0, 0, 1000],
        isPerspectiveCamera: true,
      }}
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
        {/* <OrbitControls
          autoRotate={false}
          minAzimuthAngle={Math.PI / -20}
          maxAzimuthAngle={Math.PI / 20}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 1.9}
          zoomToCursor
        /> */}
        {/* <DragControls /> */}
      </Suspense>
    </Canvas>
  );
}

export default PeriodicTable;
