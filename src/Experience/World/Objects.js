import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import Experience from "../Experience.js"

export default class Objects
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.physics = this.experience.physics
        this.debug = this.experience.debug

        // this.setParsers()
        // this.setMerge()
        this.setBox3()

    }

    setBox3()
    {
        this.collidableMeshList = []
        this.model = this.resources.items.baked.scene
        this.scene.add(this.model)
        this.collidableMeshList.push(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
            }
        })
    }

    update()
    {
        /**
         * Body
         */
        // Update me model
        this.model.position.copy(this.physics.objects.body.position)
        this.model.quaternion.copy(this.physics.objects.body.quaternion)
    }
}