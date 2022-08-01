export default class Rover {
    #context = {}
    navigator = null

    // override these with custom handlers
    onUpdated() { }
    onError() { }

    constructor(context) {
        this.#context = context
        this.#position = context.instructions.start
    }

    set #position(position) {
        try {
            const [x, y, direction] = position.split(' ')

            if (
                isNaN(parseInt(x)) ||
                isNaN(parseInt(y)) ||
                Number(x) < 1 ||
                Number(y) < 1 ||
                !direction ||
                !'NEWS'.includes(direction)
            ) throw new Error('Starting position should be in the format `[number] [number] [N|E|W|S]`')

            if (
                Number(x) > this.#zone.x ||
                Number(y) > this.#zone.y
            ) throw new Error('Starting position is out of bounds')

            this.#context.position = {
                x: Number(x),
                y: Number(y),
                direction
            }
        } catch (error) {
            this.onError(error)
        }
    }

    get #position() {
        return this.#context.position
    }

    get #zone() {
        return this.#context.zone
    }

    #emitPosition() {
        this.onUpdated(this.#position)
    }

    get #direction() {
        return this.#position.direction
    }

    set #direction(direction) {
        this.#position.direction = direction
    }

    // set and execute commands
    navigate(commands, speed) {
        if (commands.match(/[^MLR]/gm)) throw new Error('The only valid commands are M, L, and R')

        let resolve, reject

        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        this.navigator = setTimeout(() => {
            try {
                if (this.navigator) {
                    commands = Array.from(commands)
                    this.#execute(commands.shift())
                    this.#emitPosition()

                    if (commands.length) resolve(this.navigate(commands.join('')))
                    else resolve()
                }
            } catch (error) {
                this.#emitPosition()
                this.onError(error)
                reject(error)
            }
        }, speed)

        return promise
    }

    stop() {
        if (this.navigator) clearTimeout(this.navigator)
    }

    #execute(command) {
        if (command == 'M') this.#move()
        if (command == 'R') this.#right()
        if (command == 'L') this.#left()
    }

    // Rover actions
    #move() {
        if (this.#direction == 'N') this.#position.y++
        if (this.#direction == 'E') this.#position.x++
        if (this.#direction == 'S') this.#position.y--
        if (this.#direction == 'W') this.#position.x--

        if (
            this.#position.y > this.#zone.y ||
            this.#position.x > this.#zone.x ||
            this.#position.x < 1 ||
            this.#position.y < 1
        ) throw new Error('The commands go out of bounds')
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
