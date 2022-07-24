class Rover {
    constructor({ zone, start, commands }) {
        this.zone = parseZone(zone)
        this.start = parseStartingPosition.call(this, start)
        this.commands = parseCommands(commands)
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

function parseStartingPosition(str) {
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