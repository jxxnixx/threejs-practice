'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
	OrbitControls,
	Environment,
	ContactShadows,
	Lightformer,
	MeshTransmissionMaterial,
	Float,
} from '@react-three/drei'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { easing } from 'maath'
import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'

const fonts = [
	'https://threejs.org/examples/fonts/gentilis_bold.typeface.json',
	'https://threejs.org/examples/fonts/gentilis_regular.typeface.json',
	'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
	'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
	'https://threejs.org/examples/fonts/optimer_bold.typeface.json',
	'https://threejs.org/examples/fonts/optimer_regular.typeface.json',
]

const fonts2 = [
	// '/fonts/Apahal_Regular.json',
	// '/fonts/Ave Fedan PERSONAL USE ONLY_Regular.json',
	// '/fonts/Cherry and Kisses Personal Use_Regular.json',
	// '/fonts/DurianPartyDemo_Regular (1).json',

	// '/fonts/DurianPartyDemo_Regular.json',
	// '/fonts/Lonely Coffee_Regular (1).json',
	// '/fonts/Lonely Coffee_Regular.json',
	// '/fonts/Lucy the Cat_Regular.json',

	'/fonts/Motley Forces_Regular.json',
	'/fonts/Sketch Bego Fill_Regular.json',
	'/fonts/Voogle Extrude_Regular.json',
	'/fonts/Voogle_Regular.json',
]

const fontPositions = [
	// [-13, 10, -5],
	// [-13, 5, -5],
	// [-13, 0, -5],
	// [-13, -5, -5],

	[0, 10, -5],
	[0, 5, -5],
	[0, 0, -5],
	[0, -5, -5],

	// [13, 10, -5],
	// [13, 5, -5],
	// [13, 0, -5],
	// [13, -5, -5],
]

const GlassText: React.FC = () => {
	const meshRefs = useRef<THREE.Group[]>([])

	useEffect(() => {
		const loader = new FontLoader()
		fonts2.forEach((fontUrl, index) => {
			loader.load(fontUrl, (font) => {
				const geometry = new TextGeometry('Loogle', {
					font: font,
					size: 2.5,
					height: 1,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 0.15,
					bevelSize: 0.15,
					bevelOffset: 0,
					bevelSegments: 7.5,
				})

				const material = new THREE.MeshPhysicalMaterial({
					color: 0xffffff,
					metalness: 0.15,
					roughness: 0.05,
					transmission: 1,
					opacity: 1,
					transparent: true,
					clearcoat: 0.8,
					clearcoatRoughness: 1,
				})

				const mesh = new THREE.Mesh(geometry, material)
				if (meshRefs.current[index]) {
					meshRefs.current[index].add(mesh)
					mesh.position.set(0, 0, 0)
				}
			})
		})
	}, [])

	return (
		<>
			{fonts2.map((_, index) => (
				<group key={index} ref={(el) => (meshRefs.current[index] = el!)} position={fontPositions[index]} />
			))}
		</>
	)
}

const Rig: React.FC = () => {
	useFrame((state, delta) => {
		easing.damp3(
			state.camera.position,
			[Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
			0.2,
			delta
		)
		state.camera.lookAt(0, 0, 0)
	})
	return null
}

const Scene: React.FC = () => {
	return (
		<Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 30] }}>
			<color attach="background" args={['#e0e0e0']} />
			<spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />

			<ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />

			<Environment preset="city">
				<Lightformer
					intensity={8}
					position={[10, 5, 0]}
					scale={[10, 50, 1]}
					onUpdate={(self) => self.lookAt(0, 0, 0)}
				/>
			</Environment>

			<Float floatIntensity={2}>
				<GlassText />
			</Float>

			<EffectComposer>
				<N8AO aoRadius={1} intensity={2} />
				<TiltShift2 blur={0.2} />
			</EffectComposer>

			<Rig />

			<ambientLight intensity={Math.PI / 2} />
			<directionalLight intensity={1} castShadow position={[1, 1, 1]} />

			<OrbitControls />
		</Canvas>
	)
}

export default Scene
