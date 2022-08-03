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
        // this.setBox3()
        // this.setPlane()
        this.setGrass()

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

    // 草
    setGrass()
    {
        // const triangleGeometry = new THREE.BufferGeometry()
        // triangleGeometry.vertices.push(new THREE.Vector3(-0.9, -0.9, 0));
        // triangleGeometry.vertices.push(new THREE.Vector3( 0.9, -0.9, 0));
        // triangleGeometry.vertices.push(new THREE.Vector3( 0,    0.9, 0));
        // triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

        // const triangleMaterial = new THREE.MeshBasicMaterial({
        //     color: 0xFF0000,
        //     side: THREE.DoubleSide
        // });

        // const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

        // // Add triangle to scene
        // scene.add(triangleMesh);

        this.geometry = new THREE.BufferGeometry()

        this.positionsArray = new Float32Array([
            0, 0, 0, // First vertex
            0, 0.5 * 0.3, 0, // Second vertex
            0.1 * 0.3, 0, 0  // Third vertex
        ])

        this.positionsAttribute = new THREE.BufferAttribute(this.positionsArray, 3)
        this.geometry.setAttribute('position', this.positionsAttribute)

        this.material = new THREE.MeshBasicMaterial({ 
            color: 0xb9c42f,
            side: THREE.DoubleSide
        })

        for (let x = 0; x < 100; ++x)
        {
            const grass = new THREE.Mesh(this.geometry, this.material)
            grass.position.set((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2)
            this.scene.add(grass)
        }

        // this.triangle = new THREE.Mesh(this.geometry, this.material)
        // this.triangle.position.set(1, 0, 1)
        // this.scene.add(this.triangle)

        // this.collidableMeshList.push(this.planemodel)

        // this.grass.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.castShadow = true
        //         child.position.set(0, 0, 0)
        //     }
        // })
    }

    update()
    {
        /**
         * Body
         */
        // Update box3 model
        // this.model.position.copy(this.physics.objects.body.position)
        // this.model.quaternion.copy(this.physics.objects.body.quaternion)

        // Update plane model
        // this.planemodel.position.copy(this.physics.plane.body.position)
        // this.planemodel.quaternion.copy(this.physics.plane.body.quaternion)
    }
}