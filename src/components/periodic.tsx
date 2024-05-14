'use client'

import React, { useEffect } from 'react'
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js'
import { TrackballControls } from 'three/examples/jsm/Addons.js'
import TWEEN from '@tweenjs/tween.js'
import { elements, period1, period2, period3, period4, period5, period6, period7 } from './elements'

// const SphereComponent = () => {
// 	useEffect(() => {
// 		let camera: any, scene: any, renderer: any, controls: any
// 		let objects: any = []
// 		let targets = { sphere: [] }

// 		const init = () => {
// 			camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
// 			camera.position.z = 3000

// 			scene = new THREE.Scene()

// 			// sphere

// 			const vector = new THREE.Vector3()

// 			period4.forEach((element, index) => {
// 				const phi = Math.acos(-1 + (2 * index) / period4.length)
// 				const theta = Math.sqrt(period4.length * Math.PI) * phi

// 				const text = document.createElement('div')
// 				text.className = 'element'
// 				text.style.backgroundColor = 'rgba(0,127,127,0.25)'
// 				text.textContent = element.symbol

// 				const elementObject = new CSS3DObject(text)
// 				elementObject.position.setFromSphericalCoords(800, phi, theta)

// 				vector.copy(elementObject.position).multiplyScalar(2)
// 				elementObject.lookAt(vector)

// 				scene.add(elementObject)
// 				objects.push(elementObject)

// 				targets.sphere.push(elementObject as never)
// 			})

// 			period7.forEach((element, index) => {
// 				const phi = Math.acos(-1 + (2 * index) / period7.length)
// 				const theta = Math.sqrt(period7.length * Math.PI) * phi

// 				const text = document.createElement('div')
// 				text.className = 'element'
// 				text.style.backgroundColor = 'rgba(0,127,127,0.25)'
// 				text.textContent = element.symbol

// 				const elementObject = new CSS3DObject(text)
// 				elementObject.position.setFromSphericalCoords(400, phi, theta)

// 				vector.copy(elementObject.position).multiplyScalar(2)
// 				elementObject.lookAt(vector)

// 				scene.add(elementObject)
// 				objects.push(elementObject)

// 				targets.sphere.push(elementObject as never)
// 			})

// 			// for (let i = 0; i < objects.length; i++) {
// 			//   let phi = Math.acos(-1 + (2 * i) / objects.length);
// 			//   let theta = Math.sqrt(objects.length * Math.PI) * phi;

// 			//   let object = new THREE.Object3D();
// 			//   object.position.setFromSphericalCoords(800, phi, theta);

// 			//   vector.copy(object.position).multiplyScalar(2);
// 			//   object.lookAt(vector);

// 			//   targets.sphere.push(object as never);
// 			// }

// 			//

// 			renderer = new CSS3DRenderer()
// 			renderer.setSize(window.innerWidth, window.innerHeight)
// 			document.getElementById('container')?.appendChild(renderer.domElement)

// 			//

// 			controls = new TrackballControls(camera, renderer.domElement)
// 			controls.minDistance = 500
// 			controls.maxDistance = 6000
// 			controls.addEventListener('change', render)

// 			transform(targets.sphere, 2000)

// 			window.addEventListener('resize', onWindowResize)
// 		}

// 		const transform = (targets: any, duration: any) => {
// 			TWEEN.removeAll()

// 			for (let i = 0; i < objects.length; i++) {
// 				const object = objects[i]
// 				const target = targets[i]

// 				new TWEEN.Tween(object.position)
// 					.to(
// 						{
// 							x: target.position.x,
// 							y: target.position.y,
// 							z: target.position.z,
// 						},
// 						Math.random() * duration + duration
// 					)
// 					.easing(TWEEN.Easing.Exponential.InOut)
// 					.start()

// 				new TWEEN.Tween(object.rotation)
// 					.to(
// 						{
// 							x: target.rotation.x,
// 							y: target.rotation.y,
// 							z: target.rotation.z,
// 						},
// 						Math.random() * duration + duration
// 					)
// 					.easing(TWEEN.Easing.Exponential.InOut)
// 					.start()
// 			}

// 			new TWEEN.Tween({})
// 				.to({}, duration * 2)
// 				.onUpdate(render)
// 				.start()
// 		}

// 		const onWindowResize = () => {
// 			camera.aspect = window.innerWidth / window.innerHeight
// 			camera.updateProjectionMatrix()
// 			renderer.setSize(window.innerWidth, window.innerHeight)
// 			render()
// 		}

// 		const animate = () => {
// 			requestAnimationFrame(animate)
// 			TWEEN.update()
// 			controls.update()
// 		}

// 		const render = () => {
// 			renderer.render(scene, camera)
// 		}

// 		init()
// 		animate()

// 		// Cleanup function
// 		return () => {
// 			window.removeEventListener('resize', onWindowResize)
// 			document.getElementById('container')?.removeChild(renderer.domElement)
// 		}
// 	}, [])

// 	return <div id="container" />
// }

// export default SphereComponent

const createCSS3DObject = (text: HTMLDivElement, position: THREE.Vector3): CSS3DObject => {
	const elementObject = new CSS3DObject(text)
	elementObject.position.copy(position)
	return elementObject
}

const SphereComponent: React.FC = () => {
	useEffect(() => {
		let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: CSS3DRenderer, controls: TrackballControls
		let objects: CSS3DObject[] = []
		let targets: any = { sphere: [] }

		const init = (): void => {
			camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
			camera.position.z = 3000

			scene = new THREE.Scene()

			const addElementsToSphere = (
				period:
					| typeof period1
					| typeof period2
					| typeof period3
					| typeof period4
					| typeof period5
					| typeof period6
					| typeof period7,
				radius: number
			): void => {
				const vector = new THREE.Vector3()
				period.forEach((element, index) => {
					const phi = Math.acos(-1 + (2 * index) / period.length)
					const theta = Math.sqrt(period.length * Math.PI) * phi

					const text = document.createElement('div')
					text.className = 'element'
					text.style.backgroundColor = 'rgba(0,127,127,0.25)'
					text.textContent = element.symbol

					const position = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta)
					const elementObject = createCSS3DObject(text, position)

					vector.copy(elementObject.position).multiplyScalar(2)
					elementObject.lookAt(vector)

					scene.add(elementObject)
					objects.push(elementObject)
					targets.sphere.push(elementObject)
				})
			}

			addElementsToSphere(period4, 800)
			addElementsToSphere(period7, 400)

			renderer = new CSS3DRenderer()
			renderer.setSize(window.innerWidth, window.innerHeight)
			document.getElementById('container')?.appendChild(renderer.domElement)

			controls = new TrackballControls(camera, renderer.domElement)
			controls.minDistance = 500
			controls.maxDistance = 6000
			controls.addEventListener('change', render)

			// transform(targets.sphere, 2000)

			window.addEventListener('resize', onWindowResize)
		}

		// const transform = (targets: { sphere: CSS3DObject[] }, duration: number): void => {
		// 	// targets.sphere 배열이 비어 있는지 or 초기화되지 않았는지 확인
		// 	if (!targets.sphere || targets.sphere.length === 0) {
		// 		console.error('targets.sphere 배열이 비어 있거나 초기화되지 않았습니다.')
		// 		return
		// 	}

		// 	TWEEN.removeAll()
		// 	objects.forEach((object, i) => {
		// 		// i가 targets.sphere 배열의 범위 내에 있는지 확인
		// 		if (i < targets.sphere.length) {
		// 			const target = targets.sphere[i]

		// 			new TWEEN.Tween(object.position)
		// 				.to(
		// 					{ x: target.position.x, y: target.position.y, z: target.position.z },
		// 					Math.random() * duration + duration
		// 				)
		// 				.easing(TWEEN.Easing.Exponential.InOut)
		// 				.start()

		// 			new TWEEN.Tween(object.rotation)
		// 				.to(
		// 					{ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
		// 					Math.random() * duration + duration
		// 				)
		// 				.easing(TWEEN.Easing.Exponential.InOut)
		// 				.start()
		// 		} else {
		// 			console.error('targets.sphere 배열의 인덱스가 범위를 벗어났습니다.')
		// 		}
		// 	})

		// 	new TWEEN.Tween({})
		// 		.to({}, duration * 2)
		// 		.onUpdate(render)
		// 		.start()
		// }

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
			document.getElementById('container')?.removeChild(renderer.domElement)
		}
	}, [])

	return <div id="container" />
}

export default SphereComponent
