'use client'

import { Stats, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'

const Models = [
	{ title: 'amongUs', url: '/models/amongUs.glb' },
	{ title: 'nightSea', url: '/models/nightSeaView.glb' },
	{ title: 'jungle', url: '/models/jungleView.glb' },
	{
		title: 'ancient',
		url: '/models/ancientArchitectureView.glb',
	},
	{ title: 'kirby', url: '/models/kirby.glb' },
	{ title: 'octopus', url: '/models/octopus.glb' },
	{ title: 'totoro', url: '/models/totoro.glb' },
	{ title: 'digda', url: '/models/digda.glb' },
	{ title: 'pokemon', url: '/models/pokemon.glb' },
	{ title: 'skybox', url: '/models/skybox.glb' },
]

function Model({ title }: any) {
	const { scene } = useGLTF(Models.find((model) => model.title === title)!.url)

	return <primitive object={scene} />
}

function Rotate(props: any) {
	const ref: any = useRef()
	useFrame((state) => (ref.current.rotation.y = state.clock.elapsedTime))
	return <group ref={ref} {...props} />
}

function Back({ title, position }: any) {
	return (
		<group position={position} scale={1}>
			<Model title={title} />
		</group>
	)
}

function AmongUs() {
	return (
		<group position={[-10, 2.5, 7.5]} scale={1.5}>
			<Rotate position-y={-0.5} scale={0.2}>
				<Model title="amongUs" />
			</Rotate>
			<OrbitControls />
		</group>
	)
}

function Character({ title, scale }: any) {
	const x = Math.random() * 100
	const y = Math.random() * 100
	const z = Math.random() * 100

	return (
		<group position={[x, y, z]} scale={scale}>
			<Model title={title} />
			<OrbitControls />
		</group>
	)
}

const View = () => {
	const characters = [
		{ title: 'kirby', scale: 10 },
		{ title: 'digda', scale: 4 },
		{ title: 'amongUs', scale: 2 },
	]

	return (
		<Suspense fallback={<span>loading...</span>}>
			<Canvas style={{ width: '100%', height: '800px' }} camera={{ position: [0, 300, -1] }}>
				<directionalLight position={[10, 10, 0]} intensity={7.5} />
				<directionalLight position={[-10, 10, 5]} intensity={5} />
				<directionalLight position={[-10, 20, 0]} intensity={2.5} />
				<directionalLight position={[0, -10, 0]} intensity={0.25} />

				<Back title="skybox" position={[0, 0, 0]} />

				{characters.map((character, index) => (
					<Character key={`${character.title}_${index}`} title={character.title} scale={character.scale} />
				))}

				<Stats />
			</Canvas>
		</Suspense>
	)
}

export default View
