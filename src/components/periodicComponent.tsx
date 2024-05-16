'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, Vector3, useFrame } from '@react-three/fiber'
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

function createElementAndAddToScene(scene: any, element: any, position: any, vector: any) {
	const text = document.createElement('div')
	text.className = 'element'
	text.style.backgroundColor = 'rgba(0,127,127,0.25)'
	text.textContent = `${element.number} ${element.symbol}\n${element.name}\n${element.weight}`

	const elementObject = createCSS3DObject(text, position)

	return elementObject
}

const addElementsToSphere = (scene: THREE.Scene, data: any, bigRadius: number) => {
	const objects: CSS3DObject[] = []
	const vector = new THREE.Vector3()
	let targets: any = { sphere: [] }

	data.forEach((element: any, index: any) => {
		const phi = Math.acos(-1 + (2 * index) / data.length)
		const theta = Math.sqrt(data.length * Math.PI) * phi

		const position = vector.setFromSphericalCoords(bigRadius, phi, theta)

		const elementObject = createElementAndAddToScene(scene, element, position, vector)

		vector.copy(elementObject.position).multiplyScalar(2)
		elementObject.lookAt(vector)

		scene?.add(elementObject)
		objects.push(elementObject)
		targets.sphere.push(elementObject)
	})
}

const setupRendering = (
	renderer: CSS3DRenderer,
	containerRef: React.MutableRefObject<HTMLDivElement | null>,
	camera: THREE.PerspectiveCamera,
	controls: TrackballControls,
	render: () => void,
	onWindowResize: () => void
) => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	containerRef.current!.appendChild(renderer.domElement)

	controls = new TrackballControls(camera, renderer.domElement)
	controls.minDistance = 500
	controls.maxDistance = 6000
	controls.addEventListener('change', render)

	window.addEventListener('resize', onWindowResize)
}

function BigSphere({ period, smaillRadius, bigRadius, color }: any) {
	const { sphere } = addElementsToSphere({ data: period, bigRadius })

	const ref: any = useRef()
	const clicked: any = useRef()

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
	)
}



const PeriodComponent = () => {

	

   useEffect(() => {
      		const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
      		camera.position.z = 3000
      
      		const render = () => {
      			renderer.render(scene, camera)
      		}
      
      		const onWindowResize = () => {
      			camera.aspect = window.innerWidth / window.innerHeight
      			camera.updateProjectionMatrix()
      			renderer.setSize(window.innerWidth, window.innerHeight)
      			render()
      		}
      
      		const init = () => {
      			renderer = new CSS3DRenderer()
      			setupRendering(renderer, containerRef, camera, controls, render, onWindowResize)
      		}
      
      		const animate = () => {
      			requestAnimationFrame(animate)
      			controls.update()
      		}
      
      		init()
      		animate()
      
      		return () => {
      			window.removeEventListener('resize', onWindowResize)
      			containerRef.current!.removeChild(renderer.domElement)
      		}
      	}, [scene])
      
      	return (
      		<div ref={containerRef}>
      			<Canvas>.</Canvas>
      		</div>
      	)
      }
}

// const BigSphere: React.FC<{ period: any[]; bigRadius: number; scene: THREE.Scene }> = ({
// 	period,
// 	bigRadius,
// 	scene,
// }) => {
// 	const containerRef = useRef<HTMLDivElement>(null)
// 	let renderer: CSS3DRenderer, controls: TrackballControls

// 	useEffect(() => {
// 		const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
// 		camera.position.z = 3000

// 		const render = () => {
// 			renderer.render(scene, camera)
// 		}

// 		const onWindowResize = () => {
// 			camera.aspect = window.innerWidth / window.innerHeight
// 			camera.updateProjectionMatrix()
// 			renderer.setSize(window.innerWidth, window.innerHeight)
// 			render()
// 		}

// 		const init = () => {
// 			renderer = new CSS3DRenderer()
// 			setupRendering(renderer, containerRef, camera, controls, render, onWindowResize)
// 		}

// 		const animate = () => {
// 			requestAnimationFrame(animate)
// 			controls.update()
// 		}

// 		init()
// 		animate()

// 		return () => {
// 			window.removeEventListener('resize', onWindowResize)
// 			containerRef.current!.removeChild(renderer.domElement)
// 		}
// 	}, [scene])

// 	return (
// 		<div ref={containerRef}>
// 			<Canvas>.</Canvas>
// 		</div>
// 	)
// }

export default PeriodComponent
