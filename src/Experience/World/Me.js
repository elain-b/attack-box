import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Me
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.physics = this.experience.physics
        this.debug = this.experience.debug

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('fox')
        // }

        // Setup
        // this.resource = this.resources.items.foxModel
        // this.resource = this.resources.items.box2

        this.setModel()
        // this.setAnimation()
    }

    setModel()
    {
        this.model = this.resources.items.box2.scene
        // this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update()
    {
        // this.animation.mixer.update(this.time.delta * 0.001)

        /**
         * Body
         */
        // Update me model
        this.model.position.copy(this.physics.box.body.position)
        this.model.quaternion.copy(this.physics.box.body.quaternion)
        // for (const object of objectsToUpdate2) {
        //     // object.model.position.copy(object.body.position)
        //     // object.model.quaternion.copy(object.body.quaternion)
        //     object.model.traverse(function (obj) {
        //         if ( obj.name === 'box2' )
        //         {
        //             moveControl(object, obj)
        //         }
        //     })
        // }
    }
}