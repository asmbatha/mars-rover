class Rover {
    constructor({ zone }) {
        this.zone = zone
    }
}

function parseZone(str) {
    const [x, y] = str.split(' ')

    // check zone format
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

export default function (config) {
    // validate zone
    return new Rover({
        zone: parseZone(config.zone)
    })
}