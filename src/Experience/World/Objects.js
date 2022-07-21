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

        this.collidableMeshList = []

        // this.setParsers()
        // this.setMerge()
        this.setBox3()
        this.setPlane()

    }

    setBox3()
    {
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

    // 斜面
    setPlane()
    {
        this.planemodel = this.resources.items.plane.scene
        this.scene.add(this.planemodel)
        this.collidableMeshList.push(this.planemodel)

        this.planemodel.traverse((child) =>
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
        // Update box3 model
        this.model.position.copy(this.physics.objects.body.position)
        this.model.quaternion.copy(this.physics.objects.body.quaternion)

        // Update plane model
        this.planemodel.position.copy(this.physics.plane.body.position)
        this.planemodel.quaternion.copy(this.physics.plane.body.quaternion)
    }
}