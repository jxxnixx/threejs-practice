'use client'

import React, { useEffect } from 'react'
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js'
import { TrackballControls } from 'three/examples/jsm/Addons.js'
import TWEEN from '@tweenjs/tween.js'
import { elements, period1, period2, period3, period4, period5, period6, period7 } from './elements'

const SphereComponent = () => {
	useEffect(() => {
		let camera: any, scene: any, renderer: any, controls: any
		let objects: any = []
		let targets = { sphere: [] }

		const init = () => {
			camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
			camera.position.z = 3000

			scene = new THREE.Scene()

			// sphere

			let vector = new THREE.Vector3()

			elements.forEach((element, index) => {
				let phi = Math.acos(-1 + (2 * index) / elements.length)
				let theta = Math.sqrt(elements.length * Math.PI) * phi

				let text = document.createElement('div')
				text.className = 'element'
				text.style.backgroundColor = 'rgba(0,127,127,0.25)'
				text.textContent = element.symbol

				let elementObject = new CSS3DObject(text)
				elementObject.position.setFromSphericalCoords(800, phi, theta)

				vector.copy(elementObject.position).multiplyScalar(2)
				elementObject.lookAt(vector)

				scene.add(elementObject)
				objects.push(elementObject)

				targets.sphere.push(elementObject as never)
			})

			// for (let i = 0; i < objects.length; i++) {
			//   let phi = Math.acos(-1 + (2 * i) / objects.length);
			//   let theta = Math.sqrt(objects.length * Math.PI) * phi;

			//   let object = new THREE.Object3D();
			//   object.position.setFromSphericalCoords(800, phi, theta);

			//   vector.copy(object.position).multiplyScalar(2);
			//   object.lookAt(vector);

			//   targets.sphere.push(object as never);
			// }

			//

			renderer = new CSS3DRenderer()
			renderer.setSize(window.innerWidth, window.innerHeight)
			document.getElementById('container')?.appendChild(renderer.domElement)

			//

			controls = new TrackballControls(camera, renderer.domElement)
			controls.minDistance = 500
			controls.maxDistance = 6000
			controls.addEventListener('change', render)

			transform(targets.sphere, 2000)

			window.addEventListener('resize', onWindowResize)
		}

		const transform = (targets: any, duration: any) => {
			TWEEN.removeAll()

			for (let i = 0; i < objects.length; i++) {
				const object = objects[i]
				const target = targets[i]

				new TWEEN.Tween(object.position)
					.to(
						{
							x: target.position.x,
							y: target.position.y,
							z: target.position.z,
						},
						Math.random() * duration + duration
					)
					.easing(TWEEN.Easing.Exponential.InOut)
					.start()

				new TWEEN.Tween(object.rotation)
					.to(
						{
							x: target.rotation.x,
							y: target.rotation.y,
							z: target.rotation.z,
						},
						Math.random() * duration + duration
					)
					.easing(TWEEN.Easing.Exponential.InOut)
					.start()
			}

			new TWEEN.Tween({})
				.to({}, duration * 2)
				.onUpdate(render)
				.start()
		}

		const onWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
			render()
		}

		const animate = () => {
			requestAnimationFrame(animate)
			TWEEN.update()
			controls.update()
		}

		const render = () => {
			renderer.render(scene, camera)
		}

		init()
		animate()

		// Cleanup function
		return () => {
			window.removeEventListener('resize', onWindowResize)
			document.getElementById('container')?.removeChild(renderer.domElement)
		}
	}, [])

	return <div id="container" />
}

export default SphereComponent
