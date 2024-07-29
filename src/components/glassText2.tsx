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
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { easing } from 'maath'
import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'

const GlassText: React.FC = () => {
	const meshRef = useRef<THREE.Group>(null)

	useEffect(() => {
		const loader = new FontLoader()
		loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
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
			if (meshRef.current) {
				meshRef.current.add(mesh)
				mesh.position.set(-3, 0, 0)
			}
		})
	}, [])

	return <group ref={meshRef} />
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

const Knot: React.FC<any> = (props) => (
	<mesh receiveShadow castShadow {...props}>
		<torusKnotGeometry args={[3, 1, 256, 32]} />
		<MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
	</mesh>
)

// const Bomb: React.FC<any> = (props) => {
//   const { nodes } = useGLTF("/bomb-gp.glb")
//   return (
//     <mesh receiveShadow castShadow geometry={nodes.Little_Boy_Little_Boy_Material_0.geometry} {...props}>
//       <MeshTransmissionMaterial backside backsideThickness={10} thickness={5} />
//     </mesh>
//   )
// }

const Scene: React.FC = () => {
	return (
		<Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 10] }}>
			<color attach="background" args={['#e0e0e0']} />
			<spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />

			{/* <Float floatIntensity={2}>
				<Knot />
			</Float> */}

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
