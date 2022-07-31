import { Vec3 } from 'cannon'
import * as THREE from 'three'
import Experience from "../Experience.js"
import World from './World.js'

export default class Me
{
    constructor()
    {
        // temporary data
        this.charactorDirection = new THREE.Vector3(1, 0, 0)
        // this.walkDirection = new THREE.Vector3()
        // this.walkDirectionAngle = 0
        this.rotateAngle = new THREE.Vector3(0, -1, 0)
        this.rotateQuarternion = new THREE.Quaternion()
        this.oldDirection = 0
        this.currentAction = 'Idle'

        // camera
        this.cameraTarget = new THREE.Vector3()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.physics = this.experience.physics
        this.world = this.experience.world
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('fox')
        // }

        // Setup
        // this.resource = this.resources.items.box2
        this.resource = this.resources.items.bone

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.me = {}

        // this.me.material = new THREE.MeshToonMaterial({ color: 0x382a0c })
        this.me.material = new THREE.MeshBasicMaterial({ map: this.resources.items.bakedTexture2 })
        // this.me.material = this.resources.items.bakedTexture2
        // this.me.material.flipY = false
        this.me.material.encoding = THREE.sRGBEncoding
        // console.log(this.me.material)

        // this.me.model = this.resources.items.box2.scene
        this.me.model = this.resources.items.bone.scene
        this.me.model.position.set(0, 0, 0)
        // this.me.object = this.resources.items.box2.scene.children[0]
        this.me.object = this.resources.items.bone.scene.children[0]
        for(const _child of this.me.object.children)
        {
            // if (_child.name === "bear")
            // {
            //     _child.material = this.me.material
            //     // _child.material.flipY = false
            // }

            if (_child instanceof THREE.Mesh)
            {
                _child.material = this.me.material
                _child.material.map.flipY = false
            }

            // _child.material = this.me.material
            _child.castShadow = true
            _child.position.set(0, 0, 0)
        }
        // this.me.model.material = this.me.material
        this.scene.add(this.me.model)

        // this.walkDirection.set(1, 0, 0)

        // this.model = this.resources.items.box2.scene
        // const bakedTexture = this.resources.items.bakedTexture
        // const bakedMaterial1 = new THREE.MeshBasicMaterial({ map: bakedTexture })
        // // console.log(bakedMaterial1)
        // // console.log(this.model)
        // this.model.children[0].material = bakedMaterial1
        // // console.log(this.model)
        // // this.model.scale.set(0.02, 0.02, 0.02)
        // this.scene.add(this.model)

        // this.model.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.castShadow = true
        //         child.position.set(0, 0, 0)
        //     }
        // })
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.me.model)
        
        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[1])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // this.animation.play = (name) =>
        // {
        //     const newAction = this.animation.actions[name]
        //     const oldAction = this.animation.actions.current
        //     console.log(name)

        //     newAction.reset()
        //     newAction.play()
        //     newAction.crossFadeFrom(oldAction, 1)

        //     this.animation.actions.current = newAction
        // }

        // Debug
        // if(this.debug.active)
        // {
        //     const debugObject = {
        //         playIdle: () => { this.animation.play('idle') },
        //         playWalking: () => { this.animation.play('walking') },
        //         playRunning: () => { this.animation.play('running') }
        //     }
        //     this.debugFolder.add(debugObject, 'playIdle')
        //     this.debugFolder.add(debugObject, 'playWalking')
        //     this.debugFolder.add(debugObject, 'playRunning')
        // }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)

        /**
         * Body
         */
        // Update me model
        this.me.model.position.copy(this.physics.box.body.position)
        this.me.model.quaternion.copy(this.physics.box.body.quaternion)
        this.moveControl(this.me.model.children[0])
    }

    moveControl(obj)
    {
        let targetPoint = this.me.model.position.clone()
        let tooClose = false
        let directionOffset = 0
        // var directionOffset = this.directionOffset()
        let play = ''
        let directionPressed = this.world.controls.move.w || this.world.controls.move.d || this.world.controls.move.a || this.world.controls.move.s
        let amountMove = 0

        if (directionPressed && this.world.controls.toggleRun) {
            play = 'running'
            amountMove = 0.01
        } else if (directionPressed) {
            play = 'walking'
            amountMove = 0.008
        } else {
            play = 'idle'
        }

        if (this.currentAction != play) {
            const newAction = this.animation.actions[play]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
            this.currentAction = play
        }

        if (!this.world.controls.move.w && !this.world.controls.move.d && !this.world.controls.move.a && !this.world.controls.move.s) {
            return
        }
        if (this.world.controls.move.w && this.world.controls.move.d) {
            directionOffset = Math.PI / 4
        }
        else if (this.world.controls.move.w && this.world.controls.move.a) {
            directionOffset = - Math.PI / 4
        }
        else if (this.world.controls.move.a && this.world.controls.move.s) {
            directionOffset = - Math.PI / 4 * 3
        }
        else if (this.world.controls.move.d && this.world.controls.move.s) {
            directionOffset = Math.PI / 4 * 3
        }
        else if  (this.world.controls.move.w) {
            directionOffset = 0
        }
        else if  (this.world.controls.move.s) {
            directionOffset = Math.PI
        }
        else if (this.world.controls.move.a) {
            directionOffset = - Math.PI / 2
        }
        else if  (this.world.controls.move.d) {
            directionOffset = Math.PI / 2
        }

        // calculate towards camera direction
        var angleYCharactorDirection = Math.atan2(
            (this.me.model.position.z - this.experience.camera.instance.position.z),
            (this.me.model.position.x - this.experience.camera.instance.position.x))
        
        // rotate model and body
        this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCharactorDirection + directionOffset)
        this.me.model.quaternion.rotateTowards(this.rotateQuarternion, 0.1)
        this.physics.box.body.quaternion.copy(this.me.model.quaternion)
        
        // move model & camera
        const moveVecX = Math.cos(angleYCharactorDirection + directionOffset)
        const moveVecZ = Math.sin(angleYCharactorDirection + directionOffset)
        const moveX = amountMove * moveVecX
        const moveZ = amountMove * moveVecZ
        targetPoint.x += moveX
        targetPoint.z += moveZ

        // tooClose = this.collisionDetect(obj.geometry.attributes.position, this.me.model, targetPoint)
        tooClose = this.collisionDetect(obj.children[1].geometry.attributes.position, this.me.model, targetPoint)

        // 衝突してない時
        if (!tooClose)
        {
            this.physics.box.body.position.copy(targetPoint)
            this.me.model.position.copy(targetPoint)
            this.updateCameraTarget(moveX, moveZ)
        }
        else
        {
            // const velocityValue = 5
            // const velocityX = velocityValue * moveVecX
            // const velocityZ = velocityValue * moveVecZ
            // this.physics.box.body.velocity.set(velocityX, 20, velocityZ)
        }
    }

    updateCameraTarget(moveX, moveZ) {
        // move camera
        this.camera.instance.position.x += moveX
        this.camera.instance.position.z += moveZ

        // update camera target
        this.cameraTarget.x = this.me.model.position.x
        this.cameraTarget.y = this.me.model.position.y
        this.cameraTarget.z = this.me.model.position.z
        this.camera.controls.target = this.cameraTarget
    }

    collisionDetect(childPosition, model, targetPoint)
    {
        // return false
        let tooClose = false
        for (let vertexIndex = 0; vertexIndex < childPosition.count; vertexIndex++)
        {		
            // 自分の原点から見た各頂点の座標
            let localVertex = new THREE.Vector3().fromBufferAttribute(childPosition, vertexIndex).clone()
            // 原点からみた各頂点の座標
            let globalVertex = localVertex.applyMatrix4( model.matrix )
            // 中心から頂点までの距離、光線の向き
            let directionVector = globalVertex.sub( model.position )
            
            let ray = new THREE.Raycaster( targetPoint, directionVector.clone().normalize() )
            let collisionResults = ray.intersectObjects( this.world.objects.collidableMeshList, true )
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
            {
                console.log("Hit!")
                tooClose = true
                break
            }
        }
        return tooClose
    }
}