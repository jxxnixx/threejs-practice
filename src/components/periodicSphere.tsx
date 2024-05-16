'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useCursor, Bounds, useBounds, Html } from '@react-three/drei'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { elements, period1, period2, period3, period4, period5, period6, period7 } from './elements.js'
import { CSS3DObject, CSS3DRenderer, TrackballControls } from 'three/examples/jsm/Addons.js'

const createCSS3DObject = (text: HTMLDivElement, position: THREE.Vector3): CSS3DObject => {
	const elementObject = new CSS3DObject(text)
	elementObject.position.copy(position)
	return elementObject
}

// function SmallBox({ position, element, box, color, scene, object, ...props }: any) {
// 	const [hovered, setHovered] = useState(false)

// 	console.log(object)

// 	// useFrame(() => {
// 	// 	boxRef.current.position.copy(props.position)
// 	// })

// 	// CSS3D 객체 생성 및 렌더링
// 	useEffect(() => {
// 		const text = document.createElement('div')
// 		text.className = 'element'
// 		text.style.backgroundColor = 'rgba(0,127,127,0.25)'
// 		text.textContent = `${element.number} ${element.symbol}\n${element.name}\n${element.weight}`

// 		const cssObject = createCSS3DObject(text, position)
// 		scene?.add(cssObject)

// 		console.log(cssObject)

// 		return () => {
// 			scene?.remove(cssObject)
// 		}
// 	}, [])

// 	return (
// 		<group {...props}>
// 			<mesh
// 				position={position}
// 				name={element.symbol}
// 				onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
// 				onPointerOut={() => setHovered(false)}
// 				scale={[1, 1, 0.05]}
// 			>
// 				<Html>
// 					<div id="container" />
// 				</Html>
// 			</mesh>
// 		</group>
// 	)
// }

// function createSpheresFromData({ scene, data, bigRadius }: any) {
// 	const renderer = new CSS3DRenderer()
// 	renderer.setSize(window.innerWidth, window.innerHeight)
// 	document.getElementById('container')?.appendChild(renderer.domElement)
// 	const targets: any = []

// 	let objects: CSS3DObject[] = []
// 	let index = 0
// 	const positions: any = {
// 		sphere: [],
// 	}

// 	data.forEach((element: any) => {
// 		const phi = Math.acos(-1 + (2 * index) / data.length)
// 		const theta = Math.sqrt(data.length * Math.PI) * phi

// 		const text = document.createElement('div')
// 		text.className = 'element'
// 		text.style.backgroundColor = 'rgba(0,127,127,0.25)'
// 		text.textContent = element.symbol

// 		const vector = new THREE.Vector3()

// 		const position = vector.setFromSphericalCoords(bigRadius, phi, theta)
// 		const elementObject = createCSS3DObject(text, position)

// 		vector.copy(elementObject.position).multiplyScalar(2)
// 		elementObject.lookAt(vector)

// 		scene.add(elementObject)
// 		objects.push(elementObject)
// 		targets.push(elementObject)

// 		positions.sphere.push(position)
// 		index++
// 	})

// 	return { targets, positions, objects }
// }

// function BigSphere({ period, smaillRadius, bigRadius, color, scene }: any) {
// 	const { targets, positions, objects } = addElementsToSphere({ data: period, bigRadius })

// 	return (
// 		<>
// 			{period.map((element: any, index: any) => (
// 				<group key={index}>
// 					<SmallBox
// 						element={element}
// 						position={positions.sphere[index]}
// 						box={[smaillRadius * 2, smaillRadius * 4, 1]}
// 						color={color}
// 						scene={scene.current}
// 						object={targets[index]}
// 					/>
// 					<Html>
// 						<div id="container" />
// 					</Html>
// 				</group>
// 			))}
// 		</>
// 	)
// }

// function BigSphere({ period, bigRadius, color, scene }: any) {
// 	useEffect(() => {
// 		const targets: any = []

// 		return () => {
// 			targets.forEach((target: any) => {
// 				scene.remove(target)
// 			})
// 		}
// 	}, [])

// 	return null
// }

// function SelectToZoom({ children }: any) {
// 	const api = useBounds()

// 	return (
// 		<group
// 			onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())}
// 			onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
// 		>
// 			{children}
// 		</group>
// 	)
// }

function PeriodicSphere() {
	const containerRef: any = useRef(null)

	let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: CSS3DRenderer, controls: TrackballControls
	let objects: CSS3DObject[] = []
	let targets: any = { sphere: [] }

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
	camera.position.z = 3000

	scene = new THREE.Scene()
	scene.background = new THREE.Color('skyblue')

	useEffect(() => {
		const init = (): void => {
			function addElementsToSphere(data: any, bigRadius: any) {
				const vector = new THREE.Vector3()

				data.forEach((element: any, index: any) => {
					const phi = Math.acos(-1 + (2 * index) / data.length)
					const theta = Math.sqrt(data.length * Math.PI) * phi

					const position = vector.setFromSphericalCoords(bigRadius, phi, theta)

					const text = document.createElement('div')
					text.className = 'element'
					text.style.backgroundColor = 'rgba(0,127,127,0.25)'
					text.textContent = element.symbol

					const elementObject = createCSS3DObject(text, position)

					vector.copy(elementObject.position).multiplyScalar(2)
					elementObject.lookAt(vector)

					scene?.add(elementObject)
					objects.push(elementObject)
					targets.sphere.push(elementObject)
				})
			}

			addElementsToSphere(period4, 800)
			addElementsToSphere(period7, 400)

			renderer = new CSS3DRenderer()
			renderer.setSize(window.innerWidth, window.innerHeight)
			// document.getElementById('container')?.appendChild(renderer.domElement)
			containerRef.current.appendChild(renderer.domElement)

			controls = new TrackballControls(camera, renderer.domElement)
			controls.minDistance = 500
			controls.maxDistance = 6000
			controls.addEventListener('change', render)

			window.addEventListener('resize', onWindowResize)
		}

		const onWindowResize = (): void => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
			render()
		}

		const animate = (): void => {
			requestAnimationFrame(animate)
			TWEEN.update()
			controls.update()
		}

		const render = (): void => {
			renderer.render(scene, camera)
		}

		init()
		animate()

		return (): void => {
			window.removeEventListener('resize', onWindowResize)
			//	document.getElementById('container')?.removeChild(renderer.domElement)

			containerRef.current.removeChild(renderer.domElement)
		}
	}, [])

	// useEffect(() => {
	// 	const renderer = new CSS3DRenderer()
	// 	renderer.setSize(window.innerWidth, window.innerHeight)
	// 	document.getElementById('container')?.appendChild(renderer.domElement)

	// 	return () => {
	// 		document.getElementById('container')?.removeChild(renderer.domElement)
	// 	}
	// }, [])

	// const scene = new THREE.Scene()
	// scene.background = new THREE.Color('skyblue')

	return (
		<div ref={containerRef}>
			<Canvas style={{ display: 'none' }}>dddd</Canvas>
		</div>

		// <Canvas
		// 	frameloop="demand"
		// 	camera={{
		// 		fov: 300,
		// 		near: 0.1,
		// 		far: 5000,
		// 		position: [0, 0, 1000],
		// 		isPerspectiveCamera: true,
		// 	}}
		// 	scene={scene}
		// 	style={{ height: '100vh' }}
		// >
		// 	<ambientLight />
		// 	<Suspense fallback={null}>
		// 		<Bounds observe>
		// 			<SelectToZoom>
		// 				<Html>
		// 					<div id="container" />
		// 				</Html>
		// 				<BigSphere period={period1} smaillRadius={20} bigRadius={100} color={'red'} scene={scene} />
		// 				<BigSphere period={period2} smaillRadius={20} bigRadius={200} color={'red'} scene={scene} />
		// 				<BigSphere period={period3} smaillRadius={20} bigRadius={300} color={'orange'} scene={scene} />
		// 				<BigSphere period={period4} smaillRadius={20} bigRadius={400} color={'yellow'} scene={scene} />
		// 				<BigSphere period={period5} smaillRadius={20} bigRadius={500} color={'green'} scene={scene} />
		// 				<BigSphere period={period6} smaillRadius={20} bigRadius={600} color={'blue'} scene={scene} />
		// 				<BigSphere period={period7} smaillRadius={20} bigRadius={700} color={'purple'} scene={scene} />
		// 			</SelectToZoom>
		// 		</Bounds>
		// 		<OrbitControls />
		// 		<OrbitControls
		//     autoRotate={false}
		//     minAzimuthAngle={Math.PI / -20}
		//     maxAzimuthAngle={Math.PI / 20}
		//     minPolarAngle={Math.PI / 2.1}
		//     maxPolarAngle={Math.PI / 1.9}
		//     zoomToCursor
		//   />
		// 	</Suspense>
		//  </Canvas>
	)
}

export default PeriodicSphere
