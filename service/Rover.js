export default class Rover {
    #context = {}
    navigator = null
    busy = false

    // override these with custom handlers
    onUpdated() { }
    onError() { }

    constructor(context) {
        this.#context = context
        this.position = context.instructions.start
    }

    set position(position) {
        let x, y, direction

        try {
            [x, y, direction] = position.split(' ')
        } catch (error) {
            throw new Error('Failed to extract the starting position')
        }

        this.#context.position = {
            x: Number(x),
            y: Number(y),
            direction
        }

        if (
            isNaN(parseInt(x)) ||
            isNaN(parseInt(y)) ||
            Number(x) < 1 ||
            Number(y) < 1 ||
            !direction ||
            !'NEWS'.includes(direction)
        ) throw new Error('Starting position is invalid')

        if (
            Number(x) > this.#zone.x ||
            Number(y) > this.#zone.y
        ) throw new Error('Starting position is out of bounds')
    }

    get position() {
        return this.#context.position
    }

    get #zone() {
        return this.#context.zone
    }

    #emitPosition() {
        this.onUpdated(this.position)
    }

    get #direction() {
        return this.position.direction
    }

    set #direction(direction) {
        this.position.direction = direction
    }

    navigate(commands, speed) {
        let resolve, reject
        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        try {
            if (commands.match(/[^MLR]/gm)) throw new Error('The only valid commands are M, L, and R')

            this.busy = true

            if (commands.length) {
                commands = Array.from(commands)
                this.#execute(commands.shift())
                this.#emitPosition()
            }

            if (commands.length) {
                setTimeout(() => {
                    resolve(this.busy && this.navigate(commands.join(''), speed))
                }, speed)
            } else {
                this.busy = false
                this.#emitPosition()

                resolve(this)
            }
        } catch (error) {
            this.#emitPosition()
            this.onError(error)
            reject(error)
        }

        return promise
    }

    stop() {
        if (this.busy) this.busy = false
    }

    #execute(command) {
        if (command == 'M') this.#move()
        if (command == 'R') this.#right()
        if (command == 'L') this.#left()
    }

    // Rover actions
    #move() {
        if (this.#direction == 'N') this.position.y++
        if (this.#direction == 'E') this.position.x++
        if (this.#direction == 'S') this.position.y--
        if (this.#direction == 'W') this.position.x--

        const { x, y, direction } = this.position

        if (
            this.position.y > this.#zone.y ||
            this.position.x > this.#zone.x ||
            this.position.x < 1 ||
            this.position.y < 1
        ) throw new Error(`Out of bounds: ${x} ${y} ${direction}`)
    }

    #right() {
        this.#direction = {
            N: 'E',
            E: 'S',
            S: 'W',
            W: 'N',
        }[this.#direction]
    }

    #left() {
        this.#direction = {
            N: 'W',
            E: 'N',
                S: 'E',
                W: 'S',
            }[this.#direction]
        }

}
