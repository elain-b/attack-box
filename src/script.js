import './style.css'
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'))

// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import * as dat from 'lil-gui'
// import CANNON, { Vec3 } from 'cannon'
// import { RGBA_ASTC_5x4_Format } from 'three'

// /**
//  * Debug
//  */
// const gui = new dat.GUI()
// const debugObject = {}

// debugObject.createBox = () => {
//     createBox(
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         {
//             x: (Math.random() - 0.5) * 3,
//             y: 3,
//             z: (Math.random() - 0.5) * 3
//         }
//     )
// }

// debugObject.createSphere = () => {
//     createSphere(
//         Math.random() * 0.5,
//         {
//             x: (Math.random() - 0.5) * 3,
//             y: 3,
//             z: (Math.random() - 0.5) * 3
//         }
//     )
// }

// debugObject.reset = () =>
// {
//     for(const object of objectsToUpdate)
//     {
//         // Remove
//         object.body.removeEventListener('collide', playHitSound)
//         world.removeBody(object.body)

//         // Remove mesh
//         scene.remove(object.mesh)
//     }
// }

// gui.add(debugObject, 'createSphere')
// gui.add(debugObject, 'createBox')
// gui.add(debugObject, 'reset')

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Models
//  */
//  const dracoLoader = new DRACOLoader()
//  dracoLoader.setDecoderPath('/draco/')
 
//  const gltfLoader = new GLTFLoader()
//  gltfLoader.setDRACOLoader(dracoLoader)

// /**
//  * Sounds
//  */
// const hitSound = new Audio('/sounds/hit.mp3')

// const playHitSound = (collision) => {
//     const impactStrength = collision.contact.getImpactVelocityAlongNormal()

//     if (impactStrength > 1.5)
//     {
//         hitSound.volume = Math.random()
//         hitSound.currentTime = 0
//         hitSound.play()
//     }
// }

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// const environmentMapTexture = cubeTextureLoader.load([
//     '/textures/environmentMaps/0/px.png',
//     '/textures/environmentMaps/0/nx.png',
//     '/textures/environmentMaps/0/py.png',
//     '/textures/environmentMaps/0/ny.png',
//     '/textures/environmentMaps/0/pz.png',
//     '/textures/environmentMaps/0/nz.png'
// ])

// const bakedTexture = textureLoader.load('/models/baked1.jpg')
// console.log(bakedTexture)
// bakedTexture.flipY = false
// bakedTexture.encoding = THREE.sRGBEncoding

// const bakedTexture1 = textureLoader.load('/models/baked.jpg')
// bakedTexture1.flipY = false
// bakedTexture1.encoding = THREE.sRGBEncoding

// /**
//  * Physics
//  */
// // World
// const world = new CANNON.World()
// world.broadphase = new CANNON.SAPBroadphase(world)
// // world.broadphase = new CANNON.NaiveBroadphase()
// world.allowSleep = true
// world.gravity.set(0, - 9.82, 0)

// // Materials
// // Baked material
// const bakedMaterial1 = new THREE.MeshBasicMaterial({ map: bakedTexture })
// const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture1 })

// const defaultMaterial = new CANNON.Material('default')

// const defaultContactMaterial = new CANNON.ContactMaterial(
//     defaultMaterial,
//     defaultMaterial,
//     {
//         friction: 0.003,  // 摩擦
//         restritution: 0.2 // 反発
//     }
// )
// world.addContactMaterial(defaultContactMaterial)
// world.defaultContactMaterial = defaultContactMaterial

// // Floor
// const floorShape = new CANNON.Plane()
// const floorBody = new CANNON.Body()
// floorBody.mass = 0
// floorBody.addShape(floorShape)
// floorBody.quaternion.setFromAxisAngle(
//     new CANNON.Vec3(- 1, 0, 0),
//     Math.PI * 0.5
// )
// world.addBody(floorBody)

// /**
//  * Floor
//  */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#777777',
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

// /**
//  * Lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)

// // CONTROL KEYS
// // const keyDisplayQueue = new KeyDisplay()
// var moveW = false
// var moveS = false
// var moveA = false
// var moveD = false

// document.addEventListener('keydown', (event) => {
//     // keyDisplayQueue.down(event.key)
//     console.log(event.key)
//     if (event.key == "w") {
//         moveW = true
//     }
//     if (event.key == "s") {
//         moveS = true
//     }
//     if (event.key == "a") {
//         moveA = true
//     }
//     if (event.key == "d") {
//         moveD = true
//     }
// //     if (event.isLeftPressed) {
// //         characterControls.switchRunToggle()
// //     } else {
// //         (moveForward)[event.key.toLowerCase()] = true
// //     }
// }, false)
// // document.addEventListener('keyup', (event) => {
// //     // keyDisplayQueue.up(event.key)
// //     // moveForward[event.key.toLowerCase()] = false
// //     if (event.key == "w" || event.key == "s" || event.key == "a" || event.key == "d") {
// //         boxes_mesh[0].velocity.set(0 ,0, 0)
// //         // boxes_mesh[0].velocity.setZero()
// //         // console.log(boxes_mesh[0].velocity)
// //     }
// // }, false)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () => {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(- 3, 3, 3)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Utils
//  */
// const objectsToUpdate = []
// const objectsToUpdate2 =[]
// const collidableMeshList = []
// const boxes_mesh = []
// const collidableMesh = []

// // Sphere
// const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// const sphereMaterial = new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4,
//     envMap: environmentMapTexture
// })

// const createSphere = (radius, position) => {
//     // Three.js mesh
//     const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
//     mesh.scale.set(radius, radius, radius)
//     mesh.castShadow = true
//     mesh.position.copy(position)
//     scene.add(mesh)

//     // Cannon.js body
//     const shape = new CANNON.Sphere(radius)
//     const body = new CANNON.Body({
//         mass: 1,
//         position: new CANNON.Vec3(0, 3, 0),
//         shape: shape,
//         material: defaultMaterial
//     })
//     body.position.copy(position)
//     body.addEventListener('collide', playHitSound)
//     world.addBody(body)

//     // Save in objects to update
//     objectsToUpdate.push({
//         mesh,
//         body
//     })
// }

// // createSphere(0.5, { x: 0, y: 3, z: 0 })

// // Box
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
// const boxMaterial = new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4,
//     envMap: environmentMapTexture
// })

// const createBox = (width, height, depth, position) => {
//     // Three.js mesh
//     const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
//     mesh.scale.set(width, height, depth)
//     mesh.castShadow = true
//     mesh.position.copy(position)
//     scene.add(mesh)

//     // Cannon.js body
//     const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
//     const body = new CANNON.Body({
//         mass: 0.1,
//         position: new CANNON.Vec3(0, 3, 0),
//         shape: shape,
//         material: defaultMaterial
//     })
//     body.position.copy(position)
//     body.addEventListener('collide', playHitSound)
//     world.addBody(body)
//     boxes_mesh.push(body)

//     // Save in objects to update
//     objectsToUpdate.push({
//         mesh,
//         body
//     })

//     if ( objectsToUpdate.length>1 )
//     {
//         collidableMeshList.push(mesh)
//     }
// }

// // create 2 boxes at the start
// // createBox(1, 1.5, 2, { x: 0, y: 3, z: 0 })

// new GLTFLoader().load('/models/box2.glb', function (gltf) {
//     const model = gltf.scene
//     const bakedMesh = gltf.scene.children.find(child => child.name === 'box2')
//     // Cannon.js body
//     const shape = new CANNON.Box(new CANNON.Vec3(0.5 * 0.5, 0.5 * 0.5, 0.5 * 0.5))
//     const body = new CANNON.Body({
//         mass: 1,
//         position: new CANNON.Vec3(0, 2.25, 0),
//         shape: shape,
//         material: defaultMaterial
//     })
//     body.addShape(shape)
//     body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), - Math.PI * 0.5)
//     // body.velocity.set(-2 ,0, 0)
//     model.position.copy(body.position)
//     model.traverse(function (object) {
//         if (object.isMesh) 
//         {
//             object.castShadow = true
//             object.position.set(0, 0, 0)
//         }
//     })
//     bakedMesh.material = bakedMaterial1
//     scene.add(model)
    

//     // body.addEventListener('collide', playHitSound)
//     world.addBody(body)
//     boxes_mesh.push(body)

//     // Save in objects to update
//     objectsToUpdate2.push({
//         model,
//         body
//     })
// })

// new GLTFLoader().load('/models/box3.glb', function (gltf) {
//     const model = gltf.scene
//     const bakedMesh = gltf.scene.children.find(child => child.name === 'baked')
//     // Cannon.js body
//     const shape = new CANNON.Box(new CANNON.Vec3(2 * 0.5, 2 * 0.5, 2 * 0.5))
//     const body = new CANNON.Body({
//         mass: 1,
//         position: new CANNON.Vec3(3, 1, 0),
//         shape: shape,
//         material: defaultMaterial
//     })
//     // body.velocity.set(-1 ,0, 0)
//     model.position.copy(body.position)
//     model.traverse(function (object) {
//         if (object.isMesh) 
//         {
//             object.castShadow = true
//             object.position.set(0, 0, 0)
//         }
//     })
//     bakedMesh.material = bakedMaterial1
//     scene.add(model)
//     collidableMesh.push(model)

//     world.addBody(body)
//     boxes_mesh.push(body)

//     // Save in objects to update
//     objectsToUpdate2.push({
//         model,
//         body
//     })

//     if ( objectsToUpdate2.length>1 )
//     {
//         collidableMeshList.push(model)
//     }
// })

// // createBox(0.5, 0.5, 0.5, { x: -3, y: 0.5, z: 0 })

// function collisionDetect(childPosition, model, originPoint){
//     var tooClose = false
//     for (var vertexIndex = 0; vertexIndex < childPosition.count; vertexIndex++)
//     {		
//         // 自分の原点から見た各頂点の座標
//         var localVertex = new THREE.Vector3().fromBufferAttribute(childPosition, vertexIndex).clone()
//         // 原点からみた各頂点の座標
//         var globalVertex = localVertex.applyMatrix4( model.matrix )
//         // 中心から頂点までの距離、光線の向き
//         var directionVector = globalVertex.sub( model.position )
        
//         var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() )
//         var collisionResults = ray.intersectObjects( collidableMeshList, true )
//         if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
//         {
//             console.log("Hit!")
//             tooClose = true
//             break
//         }
//     }
//     return tooClose
// }

// function moveControl(object, obj){
//     var originPoint = object.model.position.clone()
//     var tooClose = false
//     if (moveW) {
//         originPoint.x += 0.05
//         tooClose = collisionDetect(obj.geometry.attributes.position, object.model, originPoint)
//         moveW = false
//     }
//     if (moveS) {
//         originPoint.x -= 0.05
//         tooClose = collisionDetect(obj.geometry.attributes.position, object.model, originPoint)
//         moveS = false
//     }
//     if (moveA) {
//         originPoint.z += 0.05
//         tooClose = collisionDetect(obj.geometry.attributes.position, object.model, originPoint)
//         moveA = false
//     }
//     if (moveD) {
//         originPoint.z -= 0.05
//         tooClose = collisionDetect(obj.geometry.attributes.position, object.model, originPoint)
//         moveD = false
//     }
//     if (!tooClose)
//     {
//         object.body.position.copy(originPoint)
//         object.model.position.copy(originPoint)
//     }
// }

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let oldElapsedTime = 0

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - oldElapsedTime
//     oldElapsedTime = elapsedTime

//     // Update physics world
//     world.step(1 / 60, deltaTime, 3)

//     // onkeydown "W" or "S"
//     // if (moveForward == true) {
//     //     boxes_mesh[0].position.x += 0.05;
//     // }
//     // if (moveBackward == true) {
//     //     boxes_mesh[1].position.x -= 0.05;
//     // }

//     for (const object of objectsToUpdate) {
//         object.mesh.position.copy(object.body.position)
//         object.mesh.quaternion.copy(object.body.quaternion)

//         var originPoint = object.mesh.position.clone()
//         for (var vertexIndex = 0; vertexIndex < object.mesh.geometry.attributes.position.array.length; vertexIndex++)
//         {		
//             var localVertex = new THREE.Vector3().fromBufferAttribute(object.mesh.geometry.attributes.position, vertexIndex).clone()
//             var globalVertex = localVertex.applyMatrix4( object.mesh.matrix )
//             var directionVector = globalVertex.sub( object.mesh.position )
            
//             var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() )
//             var collisionResults = ray.intersectObjects( collidableMeshList )
//             // if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
//             //     console.log("Hit!")
//             //     boxes_mesh[1].velocity.set(-5 ,0, 0)
//         }
//     }

//     for (const object of objectsToUpdate2) {
//         object.model.position.copy(object.body.position)
//         object.model.quaternion.copy(object.body.quaternion)
//         object.model.traverse(function (obj) {

//             if ( obj.name === 'box2' )
//             {
//                 moveControl(object, obj)
//             }
//         })
//     }

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()