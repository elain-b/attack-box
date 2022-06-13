import CANNON from 'cannon'
import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Physics
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        // this.config = _options.config
        // this.debug = _options.debug
        // this.time = _options.time
        // this.sizes = _options.sizes
        // this.controls = _options.controls
        // this.sounds = _options.sounds

        this.setWorld()
        // this.setModels()
        // this.setMaterials()
        this.setFloor()
        this.setBox()

        this.time.on('tick', () =>
        {
            this.world.step(1 / 60, this.time.delta, 3)
        })
    }

    setWorld()
    {
        this.world = new CANNON.World()
        this.world.gravity.set(0, - 9.82, 0)
        this.world.allowSleep = true
        // this.world.gravity.set(0, 0, 0)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.defaultContactMaterial.friction = 0.003
        this.world.defaultContactMaterial.restitution = 0.2

        // Debug
        if(this.debug)
        {
            this.debugFolder.add(this.world.gravity, 'z').step(0.001).min(- 20).max(20).name('gravity')
        }
    }

    setFloor()
    {
        this.floor = {}
        this.floor.body = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            // material: this.materials.items.floor
        })

        this.floor.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), - Math.PI * 0.5)

        this.world.addBody(this.floor.body)
    }

    setBox()
    {
        this.box = {}

        /**
         * Create method
         */
        this.box.shape = new CANNON.Box(new CANNON.Vec3(0.5 * 0.5, 0.5 * 0.5, 0.5 * 0.5))
            
        this.box.body = new CANNON.Body({ mass: 1 })
        this.box.body.position.set(0, 4.25, 0)
        this.box.body.addShape(this.box.shape)
        // material: defaultMaterial
        this.world.addBody(this.box.body)

         /**
         * Sound
         */
        // this.car.chassis.body.addEventListener('collide', (_event) =>
        // {
        //     if(_event.body.mass === 0)
        //     {
        //         const relativeVelocity = _event.contact.getImpactVelocityAlongNormal()
        //         this.sounds.play('carHit', relativeVelocity)
        //     }
        // })

        /**
         * Destroy method
         */
        this.box.destroy = () =>
        {
            this.box.removeFromWorld(this.world)
            // this.models.container.remove(this.box.model.container)
        }

        /**
         * Recreate method
         */
        this.box.recreate = () =>
        {
            this.box.destroy()
            this.box.create()
            // this.car.chassis.body.wakeUp()
        }
    }

    update()
    {
        if(this.box)
            this.box.update()
    }
}