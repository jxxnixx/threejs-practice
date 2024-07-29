'use client'

import { Text3D, Text, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import THREE from 'three'
import { MeshPhysicalMaterial } from 'three'

export const GlassMaterial = new MeshPhysicalMaterial({
	color: 0x88ccff,
	metalness: 0,
	roughness: 0.1,
	transmission: 0.9,
	thickness: 0.5,
	clearcoat: 1,
	clearcoatRoughness: 0,
})

const LoogleGlassText = () => {
	return (
		<Text3D
			font="/fonts/helvetiker_regular.typeface.json"
			size={1}
			position={[0, 0, 0]}
			material={GlassMaterial}
		></Text3D>
	)
}

const GlassText = () => {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />
				<LoogleGlassText />
				<OrbitControls />
			</Canvas>
		</div>
	)
}

export default GlassText
