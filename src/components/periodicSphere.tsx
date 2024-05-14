'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useCursor, Bounds, useBounds, Html } from '@react-three/drei'
import * as THREE from 'three'
import { elements, period1, period2, period3, period4, period5, period6, period7 } from './elements.js'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/Addons.js'

const createCSS3DObject = (text: HTMLDivElement, position: THREE.Vector3): CSS3DObject => {
	const elementObject = new CSS3DObject(text)
	elementObject.position.copy(position)
	return elementObject
}

function SmallBox({ position, element, box, color, scene, object, ...props }: any) {
	const [hovered, setHovered] = useState(false)

	console.log(object)

	// useFrame(() => {
	// 	boxRef.current.position.copy(props.position)
	// })

	// CSS3D 객체 생성 및 렌더링
	// useEffect(() => {
	// 	const text = document.createElement('div')
	// 	text.className = 'element'

	// 	text.style.color = color
	// 	text.style.fontSize = 'x-large'
	// 	text.textContent = `${element.number} ${element.symbol}\n${element.name}\n${element.weight}`

	// 	const cssObject = createCSS3DObject(text, position)
	// 	scene?.add(cssObject)

	// 	// Cleanup function
	// 	return () => {
	// 		scene?.remove(cssObject)
	// 	}
	// }, [])

	return (
		<group {...props}>
			<mesh
				position={position}
				name={element.symbol}
				onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
				onPointerOut={() => setHovered(false)}
				scale={[1, 1, 0.05]}
			>
				<Html></Html>
			</mesh>
		</group>
	)
}

function createSpheresFromData({ scene, data, bigRadius }: any) {
	const targets: any = {
		sphere: [],
	}
	let objects: CSS3DObject[] = []
	let index = 0
	const positions: any = {
		sphere: [],
	}

	data.forEach((element: any) => {
		const phi = Math.acos(-1 + (2 * index) / data.length)
		const theta = Math.sqrt(data.length * Math.PI) * phi

		const text = document.createElement('div')
		text.className = 'element'
		text.style.backgroundColor = 'rgba(0,127,127,0.25)'
		text.textContent = element.symbol

		const vector = new THREE.Vector3()

		const position = vector.setFromSphericalCoords(bigRadius, phi, theta)
		const elementObject = createCSS3DObject(text, position)

		vector.copy(elementObject.position).multiplyScalar(2)
		elementObject.lookAt(vector)

		scene.add(elementObject)
		objects.push(elementObject)
		targets.sphere.push(elementObject)

		positions.sphere.push(position)
		index++
	})

	const renderer = new CSS3DRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.getElementById('container')?.appendChild(renderer.domElement)

	return { targets, positions, objects }
}

function BigSphere({ period, smaillRadius, bigRadius, color, scene }: any) {
	const { targets, positions, objects } = createSpheresFromData({ scene, data: period, bigRadius })

	return (
		<>
			{period.map((element: any, index: any) => (
				<group key={index}>
					<SmallBox
						element={element}
						position={positions.sphere[index]}
						box={[smaillRadius * 2, smaillRadius * 4, 1]}
						color={color}
						scene={scene.current}
						object={targets[index]}
					/>
					<Html>
						<div id="container" />
					</Html>
				</group>
			))}
		</>
	)
}

function SelectToZoom({ children }: any) {
	const api = useBounds()

	return (
		<group
			onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())}
			onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
		>
			{children}
		</group>
	)
}

function PeriodicSphere() {
	const scene = useRef<THREE.Scene>(new THREE.Scene())

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
						<BigSphere period={period1} smaillRadius={20} bigRadius={100} color={'red'} scene={scene.current} />
						<BigSphere period={period2} smaillRadius={20} bigRadius={200} color={'red'} scene={scene.current} />
						<BigSphere period={period3} smaillRadius={20} bigRadius={300} color={'orange'} scene={scene.current} />
						<BigSphere period={period4} smaillRadius={20} bigRadius={400} color={'yellow'} scene={scene.current} />
						<BigSphere period={period5} smaillRadius={20} bigRadius={500} color={'green'} scene={scene.current} />
						<BigSphere period={period6} smaillRadius={20} bigRadius={600} color={'blue'} scene={scene.current} />
						<BigSphere period={period7} smaillRadius={20} bigRadius={700} color={'purple'} scene={scene.current} />
					</SelectToZoom>
				</Bounds>
				<OrbitControls />
				{/* <OrbitControls
          autoRotate={false}
          minAzimuthAngle={Math.PI / -20}
          maxAzimuthAngle={Math.PI / 20}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 1.9}
          zoomToCursor
        /> */}
			</Suspense>
		</Canvas>
	)
}

export default PeriodicSphere
