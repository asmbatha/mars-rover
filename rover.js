export default class Rover {
    #context = {}

    constructor({ zone = '1 1', start = '1 1 E', commands = '' }) {
        this.zone = zone
        this.position = start
        this.#commands = commands
    }

    // Size/Boundary of Zone
    set zone(zone) {
        const [x, y] = zone.split(' ')

        if (
            !!zone.match(/[^0-9 ]+/gm) ||
            isNaN(parseInt(x)) ||
            isNaN(parseInt(y)) ||
            Number(x) < 1 ||
            Number(y) < 1
        ) throw new Error('Zone should be in the format `X Y`, and should both be numbers > 0')

        this.#context.zone = {
            x: Number(x),
            y: Number(y)
        }
    }

    get #zone() {
        return this.#context.zone
    }

    get zone() {
        const { x, y } = this.#zone
        return `${x} ${y}`
    }

    // Rover position and direction of the Zone
    set position(position) {
        const [x, y, direction] = position.split(' ')

        if (
            isNaN(parseInt(x)) ||
            isNaN(parseInt(y)) ||
            Number(x) < 1 ||
            Number(y) < 1 ||
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
    }

    get #position() {
        return this.#context.position
    }

    get position() {
        const { x, y, direction } = this.#position
        return `${x} ${y} ${direction}`
    }

    get #direction() {
        return this.#position.direction
    }

    set #direction(direction) {
        this.#position.direction = direction
    }

    // set and execute commands
    process(commands = this.commands) {
        this.#commands = commands
        Array.from(commands).forEach(this.#execute.bind(this))
        return this
    }

    set #commands(commands) {
        if (commands.match(/[^MLR]/gm)) throw new Error('The only valid commands are M, L, and R')

        this.#context.commands = commands
    }

    get commands() {
        return this.#context.commands
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
