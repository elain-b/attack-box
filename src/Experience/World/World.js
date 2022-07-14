import Experience from "../Experience.js"
import Environment from './Environment.js'
import Floor from './Floor.js'
import Me from './Me.js'
import Controls from './Controls.js'
import Objects from './Objects.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.me = new Me()
            this.environment = new Environment()
            this.controls = new Controls()
            this.objects = new Objects()
        })
    }

    update()
    {
        if(this.me)
            this.me.update()
        if(this.objects)
            this.objects.update()
    }
}