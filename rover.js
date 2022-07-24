class Rover {
    constructor({ zone, start, commands }) {
        this.zone = parseZone(zone)
        this.position = parsePosition.call(this, start)
        this.commands = parseCommands(commands)

        Array.from(this.commands).forEach(this.perform.bind(this))
    }

    get location() {
        const { x, y, direction } = this.position
        return `${x} ${y} ${direction}`
    }

    get direction() {
        return this.position.direction
    }

    set direction(direction) {
        this.position.direction = direction
    }

    get x() {
        return this.position.x
    }

    set x(x) {
        this.position.x = x
    }

    get y() {
        return this.position.y
    }

    set y(y) {
        this.position.y = y
    }


    perform(command) {
        if (command == 'M') this.move()
        if (command == 'R') this.right()
        if (command == 'L') this.left()
    }

    move() {
        if (this.direction == 'N') {
            this.y++

            if (this.y > this.zone.y) throw new Error('The commands go out of bounds')
        }

        if (this.direction == 'E') {
            this.x++
            if (this.y > this.zone.y) throw new Error('The commands go out of bounds')
        }

        if (this.direction == 'W') {
            this.x--
            if (this.x < 1) throw new Error('The commands go out of bounds')
        }

        if (this.direction == 'S') {
            this.y--
            if (this.y < 1) throw new Error('The commands go out of bounds')
        }
    }

    right() {
        if (this.direction == 'N') {
            this.direction = 'E'
        } else if (this.direction == 'E') {
            this.direction = 'S'
        } else if (this.direction == 'W') {
            this.direction = 'N'
        } else if (this.direction == 'S') {
            this.direction = 'W'
        }
    }

    left() {
        if (this.direction == 'N') {
            this.direction = 'W'
        } else if (this.direction == 'E') {
            this.direction = 'N'
        } else if (this.direction == 'W') {
            this.direction = 'S'
        } else if (this.direction == 'S') {
            this.direction = 'E'
        }
    }
}

function parseZone(str) {
    const [x, y] = str.split(' ')

    if (
        isNaN(parseInt(x)) ||
        isNaN(parseInt(y)) ||
        Number(x) < 1 ||
        Number(y) < 1
    ) throw new Error('Zone should be in the format `X Y`, and should both be numbers > 0')

    return {
        x: Number(x),
        y: Number(y)
    }
}

function parsePosition(str) {
    const [x, y, direction] = str.split(' ')

    if (
        isNaN(parseInt(x)) ||
        isNaN(parseInt(y)) ||
        Number(x) < 1 ||
        Number(y) < 1 ||
        !'NEWS'.includes(direction)
    ) throw new Error('Starting position should be in the format `[number] [number] [N|E|W|S]`')

    if (
        Number(x) > this.zone.x ||
        Number(y) > this.zone.y
    ) throw new Error('Starting position is out of bounds')

    return {
        x: Number(x),
        y: Number(y),
        direction
    }
}

function parseCommands(str) {
    if (str.match(/[^MLR]/gm)) throw new Error('The only valid commands are M, L, and R')

    return str
}

export default config => new Rover(config)