import EventEmitter from '../Utils/EventEmitter'
import Experience from "../Experience.js"

export default class Controls extends EventEmitter
{
    constructor()
    {
        super()

        // this.config = _options.config
        // this.sizes = _options.sizes
        // this.time = _options.time
        // this.camera = _options.camera
        // this.sounds = _options.sounds
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.toggleRun = true

        this.setActions()
        this.setKeyboard()
    }

    setActions()
    {
        this.move = {}
        this.move.w = false
        this.move.s = false
        this.move.a = false
        this.move.d = false
    }

    setKeyboard()
    {
        // key２つ認識
        document.addEventListener('keydown', (event) => {
            // console.log(event.key)
            if (event.key == "w") {
                this.move.w = true
            }
            if (event.key == "s") {
                this.move.s = true
            }
            if (event.key == "a") {
                this.move.a = true
            }
            if (event.key == "d") {
                this.move.d = true
            }
            if (event.key == "Shift") {
                this.toggleRun = !this.toggleRun
            }
        }, false)
        document.addEventListener('keyup', (event) => {
            if (event.key == "w") {
                this.move.w = false
            }
            if (event.key == "s") {
                this.move.s = false
            }
            if (event.key == "a") {
                this.move.a = false
            }
            if (event.key == "d") {
                this.move.d = false
            }
        }, false)
    }
}