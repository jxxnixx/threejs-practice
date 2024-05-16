'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { elements, period1, period2, period3, period4, period5, period6, period7 } from './elements.js'
import { CSS3DObject, CSS3DRenderer, TrackballControls, OrbitControls } from 'three/examples/jsm/Addons.js'

const createCSS3DObject = (text: HTMLDivElement, position: THREE.Vector3): CSS3DObject => {
	const elementObject = new CSS3DObject(text)
	elementObject.position.copy(position)
	return elementObject
}

function addElementsToSphere(data: any, bigRadius: any, scene: any, objects: any, targets: any) {
	const vector = new THREE.Vector3()

	data.forEach((element: any, index: any) => {
		// 1. position 지정
		const phi = Math.acos(-1 + (2 * index) / data.length)
		const theta = Math.sqrt(data.length * Math.PI) * phi

		const position = vector.setFromSphericalCoords(bigRadius, phi, theta)

		// 2. DOM 객체 생성
		const text = document.createElement('div')
		text.className = 'element'
		text.style.backgroundColor = 'rgba(0,127,127,0.25)'
		text.textContent = element.symbol

		const elementObject = createCSS3DObject(text, position)

		// 3. 객체 위치 복사, 객체가 해당 벡터를 바라보도록 설정
		vector.copy(elementObject.position).multiplyScalar(2)
		elementObject.lookAt(vector)

		// 4. 씬에 객체 추가, 배열에 객체 푸시
		scene?.add(elementObject)
		objects.push(elementObject)

		// 5. 타겟 배열에 객체 푸시
		targets.sphere.push(elementObject)

		elementObject.element.addEventListener('click', (event) => handleObjectClick(event, elementObject))
	})
}

const handleObjectClick = (event: any, object: any) => {
	zoomInToCenter(object)
}

// 객체 클릭 시 화면 정중앙으로 이동
const zoomInToCenter = (object: any) => {
	// 원래 위치
	object.userData.originalPosition = object.position.clone()

	// 이동 애니메이션
	const zoomTween = new TWEEN.Tween(object.position)
		.to({ x: 0, y: 0, z: 0 }, 500)
		.easing(TWEEN.Easing.Quadratic.Out)
		.start()

	// 한번 더 클릭 시 뒤집기
	object.element.addEventListener('click', handleObjectFlip)

	// 다른 영역 클릭 시 원래 위치로
	const handleClickOutside = (e: any) => {
		if (e.target !== object.element) {
			returnToOriginalPosition(object)
			document.removeEventListener('click', handleClickOutside)
		}
	}

	// 다른 영역 클릭 감지
	document.addEventListener('click', handleClickOutside)
}

// 원래 위치로
const returnToOriginalPosition = (object: any) => {
	const originalPosition = object.userData.originalPosition
	const returnTween = new TWEEN.Tween(object.position)
		.to({ x: originalPosition.x, y: originalPosition.y, z: originalPosition.z }, 500)
		.easing(TWEEN.Easing.Quadratic.Out)
		.start()
}

// 뒤집기
const handleObjectFlip = (event: any, object: any) => {
	//
}

function PeriodicSphere() {
	const containerRef: any = useRef(null)
	const controlsRef: any = useRef(null)

	let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: CSS3DRenderer, controls: TrackballControls
	let objects: CSS3DObject[] = []
	let targets: any = { sphere: [] }

	useEffect(() => {
		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
		camera.position.z = 3000

		scene = new THREE.Scene()
		scene.background = new THREE.Color('skyblue')

		const init = (): void => {
			// 데이터로 객체 생성
			addElementsToSphere(period4, 800, scene, objects, targets)
			addElementsToSphere(period7, 400, scene, objects, targets)

			// 렌더러 세팅
			renderer = new CSS3DRenderer()
			renderer.setSize(window.innerWidth, window.innerHeight)
			containerRef.current.appendChild(renderer.domElement)

			// 컨트롤러 세팅
			controls = new TrackballControls(camera, renderer.domElement)
			controls.minDistance = 500
			controls.maxDistance = 6000
			controls.addEventListener('change', render)

			controlsRef.current = new OrbitControls(camera, renderer.domElement)
			controlsRef.current.minDistance = 500
			controlsRef.current.maxDistance = 6000

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
			// controls.update()
			controlsRef.current.update()
			render()
		}

		const render = (): void => {
			renderer.render(scene, camera)
		}

		init()
		animate()

		// 언마운트 시 이벤트 제거
		return (): void => {
			window.removeEventListener('resize', onWindowResize)
			containerRef.current.removeChild(renderer.domElement)
			controlsRef.current.dispose()
		}
	}, [])

	return (
		<div ref={containerRef}>
			<Canvas style={{ position: 'absolute', zIndex: -1, backgroundColor: 'brown' }}>
				<ambientLight />a
			</Canvas>
		</div>
	)
}

export default PeriodicSphere

// react three fiber랑 굳이 같이 쓸 이유를 전혀 모르겠음
// 요소 하나하나 컨트롤 할 수도 없고
// fiber에서 간단하게 구현할 수 있는 기능들은 webgl 구현체에 관한 것들임
// 그걸 우린 많이 안 씀. 그냥 three.js로 구현하는 게 낫다고 생각됨.
// threejs의 모든 기능을 fiber가 가지고 있는 것도 아니라서,
// 하나하나 커스텀 하려면 그냥 threejs 쓰는 것도 방법임
// 시간만 낭비하는 느낌임

// jotai도 굳이?
// 현재 상황에서라면 괜히 정신만 더 없어질 수도 있을 것 같음
// 어차피 useAtom 쓰다 보면 상위에서 선언하고 props로 넘겨주는 건 똑같은데
// useState와의 차별점이 두드러지지 않음

// 그리고 threejs의 특성상 명확하게 한 기능당 하나의 코드로 작성하는 게 쉽지 않음
// 그러면 괜히 props만 더 많아지고 더 복잡해질 수도 있음
// 하나의 메인 기능을 위한 여러 세부 기능이 있을 수 있는데,
// 그걸 차라리 묶는 게 코드를 보기가 더 쉬움. 세부 기능까지 나누는 건 비효율적임
