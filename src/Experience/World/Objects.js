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
        // this.setGrass()
        // this.setGrasses()
        // this.setGrass4()
        this.setGrass5()
        // this.setKusa()
        // this.setTree()
        // this.setTree2()
        // this.setTree3()
        this.setTree3s()
        // this.setTree4()
        this.setTree4s()
        // this.setTree5()
        this.setTree5s()
        // this.setShrubs1()
        this.setShrubs1s()
        // this.setFlower1()
        this.setFlower1s()

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

        var objectZ = Math.floor(Math.random() * 20)

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

        for (let x = 0; x < 1000; ++x)
        {
            const grass = new THREE.Mesh(this.geometry, this.material)
            grass.position.set((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2)
            grass.rotation.set(0, (Math.random() - 0.5), 0)
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

    // grass
    setGrass4()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.grass4Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        // this.model = this.resources.items.grass4.scene
        // this.model.position.set(0, 0, 1)
        // this.scene.add(this.model)

        for (let x = 0; x < 1000; ++x)
        {
            // const grass = new THREE.Mesh(this.geometry, this.material)
            this.model = this.resources.items.grass4.scene
            this.model.position.set((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2)
            this.model.rotation.set(0, (Math.random() - 0.5), 0)
            this.scene.add(this.model)
        }

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    // glb草たち
    setGrasses()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.grassesTexture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.grasses.scene
        this.model.position.set(0, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setKusa()
    {
        this.material = new THREE.MeshBasicMaterial({ map: this.resources.items.kusaTexture })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.kusa.scene
        this.model.position.set(-1, 0.5, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setGrass5()
    {
        this.material = new THREE.MeshBasicMaterial({ map: this.resources.items.grass4Texture })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.grass5.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.treeTexture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree2()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.tree2Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree2.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree3()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.tree3Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree3.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree3s()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.tree3Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree3s.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree4()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.tree4Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree4.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree4s()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.tree4Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree4s.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree5()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.tree5Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree5.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setTree5s()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.tree5Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.tree5s.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setShrubs1()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.shrubs1Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.shrubs1.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setShrubs1s()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.shrubs1Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.shrubs1s.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setFlower1()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.flower1Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.flower1.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
    }

    setFlower1s()
    {
        this.material = new THREE.MeshBasicMaterial({ 
            map: this.resources.items.flower1Texture,
            side: THREE.DoubleSide
        })
        this.material.encoding = THREE.sRGBEncoding
        this.material.transparent = true
        this.model = this.resources.items.flower1s.scene
        this.model.position.set(1, 0, 0)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.position.set(0, 0, 0)
                child.material = this.material
                child.material.map.flipY = false
            }
        })
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