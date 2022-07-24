import rover from './rover.js'

let config = {}

beforeEach(() => {
    config = {
        zone: '8 8',
        start: '1 2 E',
        commands: 'MMLMRMMRRMML'
    }
})

// init Zone
// Correct format `x y`
// x and y > 1
describe('Zone initialization', () => {
    beforeEach(() => {
        config = {
            zone: '8 8',
            start: '1 2 E',
            commands: 'MMLMRMMRRMML'
        }
    })

    test('Should return error for incorrectly formatted zone', () => {
        let actual = () => rover({
            ...config,
            zone: '11'
        })
        expect(actual).toThrowError('Zone should be in the format `X Y`, and should both be numbers > 0')
    })

    test('Should return error for invalid zone', () => {
        let actual = () => rover({
            ...config,
            zone: 'X 10'
        })
        expect(actual).toThrowError('Zone should be in the format `X Y`, and should both be numbers > 0')
    })

    test('Should correctly initialize the zone', () => {
        let actual = rover({
            ...config,
            zone: '100 100'
        })

        expect(actual).toMatchObject({
            zone: {
                x: 100,
                y: 100
            }
        })
    })
})

// starting position
// Correct format `x y direction`
// x and y within the boundry
// direction is valid
describe('Starting position', () => {
    test('Should return error for incorrectly formatted starting position', () => {
        let actual = () => rover({
            ...config,
            start: '11D'
        })
        expect(actual).toThrowError('Starting position should be in the format `[number] [number] [N|E|W|S]`')
    })

    test('Should return error for invalid starting postion or direction', () => {
        let actual = () => rover({
            ...config,
            start: '1 10 D'
        })

        expect(actual).toThrowError('Starting position should be in the format `[number] [number] [N|E|W|S]`')
    })

    test('Should return error for if the starting position is out of bounds', () => {
        let actual = () => rover({
            ...config,
            start: '1 10 W'
        })
        expect(actual).toThrowError('Starting position is out of bounds')
    })

    test('Should correctly set the starting postion', () => {
        let actual = rover({
            ...config,
            start: '3 3 S'
        })

        expect(actual).toMatchObject({
            start: {
                x: 3,
                y: 3,
                direction: 'S'
            }
        })
    })
})


// commands
// Contains only valid commands
describe('Navigation Commands', () => {
    test('Should return error for invalid commands', () => {
        let actual = () => rover({
            ...config,
            commands: 'ADVDSCV'
        })
        expect(actual).toThrowError('The only valid commands are M, L, and R')
    })

    test('Should accept valid commands', () => {
        let actual = rover({
            ...config,
            commands: 'MML'
        })

        expect(actual).toMatchObject({
            commands: 'MML'
        })
    })
})


// test navigation computation
describe('Navigation computation', () => {
    test('Should detect a command path that goes out-of-bounds', () => {
        let actual = () => rover({
            zone: '3 3',
            start: '2 2 S',
            commands: 'MMMMMS'
        })

        expect(actual).toThrowError('The commands go out of bounds')
    })

    test('Should correctly compute our test case', () => {
        let actual = rover({
            zone: '8 8',
            start: '1 2 E',
            commands: 'MMLMRMMRRMML'
        })

        expect(actual).toBe({
            position: '3 3 S'
        })
    })
})

