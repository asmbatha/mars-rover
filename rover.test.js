import Rover from './Rover.js'

// init Zone
// Correct format `x y`
// x and y > 1
describe('Zone initialization', () => {
    let rover
    beforeEach(() => {
        rover = new Rover({
            zone: '8 8',
            start: '1 2 E',
            commands: ''
        })
    })

    test('Should return error for incorrectly formatted zone', () => {
        let actual = () => rover.zone = '11'

        expect(actual).toThrowError('Zone should be in the format `X Y`, and should both be numbers > 0')
    })

    test('Should return error for invalid zone', () => {
        let actual = () => rover.zone = 'X 10'

        expect(actual).toThrowError('Zone should be in the format `X Y`, and should both be numbers > 0')
    })

    test('Should correctly initialize the zone', () => {
        rover.zone = '100 100'

        expect(rover.zone).toBe('100 100')
    })
})

// starting position
// Correct format `x y direction`
// x and y within the boundry
// direction is valid
describe('Starting position', () => {
    let rover
    beforeEach(() => {
        rover = new Rover({
            zone: '8 8',
            start: '1 2 E',
            commands: ''
        })
    })

    test('Should return error for incorrectly formatted starting position', () => {
        let actual = () => rover.position = '11D'

        expect(actual).toThrowError('Starting position should be in the format `[number] [number] [N|E|W|S]`')
    })

    test('Should return error for invalid starting postion or direction', () => {
        let actual = () => rover.position = '1 10 D'

        expect(actual).toThrowError('Starting position should be in the format `[number] [number] [N|E|W|S]`')
    })

    test('Should return error for if the starting position is out of bounds', () => {
        let actual = () => rover.position = '1 10 W'

        expect(actual).toThrowError('Starting position is out of bounds')
    })

    test('Should correctly set the starting postion', () => {
        rover.position = '1 2 E'

        expect(rover.position).toBe('1 2 E')
    })
})

// commands
// Contains only valid commands
describe('Validate navigation Commands', () => {
    let rover
    beforeEach(() => {
        rover = new Rover({
            zone: '8 8',
            start: '1 2 E',
            commands: ''
        })
    })

    test('Should return error for invalid commands', () => {
        let actual = () => rover.process('ADVDSCV')

        expect(actual).toThrowError('The only valid commands are M, L, and R')
    })

    test('Should accept valid commands', () => {
        rover.process('MML')

        expect(rover.commands).toBe('MML')
    })
})

// test single operations
describe('Can perform basic operations', () => {
    describe('North', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: '8 8',
                start: '4 4 N',
                commands: ''
            })
        })

        test('Moves up when facing North', () => {
            rover.process('M')

            expect(rover.position).toBe('4 5 N')
        })

        test('Faces East when turning to the right', () => {
            rover.process('R')

            expect(rover.position).toBe('4 4 E')
        })

        test('Faces West when turning to the left', () => {
            rover.process('L')

            expect(rover.position).toBe('4 4 W')
        })
    })

    describe('East', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: '8 8',
                start: '4 4 E',
                commands: ''
            })
        })

        test('Moves towards the right when facing East', () => {
            rover.process('M')

            expect(rover.position).toBe('5 4 E')
        })

        test('Faces South when turning to the right', () => {
            rover.process('R')

            expect(rover.position).toBe('4 4 S')
        })

        test('Faces North when turning to the left', () => {
            rover.process('L')

            expect(rover.position).toBe('4 4 N')
        })
    })

    describe('South', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: '8 8',
                start: '4 4 S',
                commands: ''
            })
        })

        test('Moves down when facing South', () => {
            rover.process('M')

            expect(rover.position).toBe('4 3 S')
        })

        test('Faces West when turning to the right', () => {
            rover.process('R')

            expect(rover.position).toBe('4 4 W')
        })

        test('Faces East when turning to the left', () => {
            rover.process('L')

            expect(rover.position).toBe('4 4 E')
        })
    })

    describe('West', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: '8 8',
                start: '4 4 W',
                commands: ''
            })
        })

        test('Moves left when facing West', () => {
            rover.process('M')

            expect(rover.position).toBe('3 4 W')
        })

        test('Faces North when turning to the right', () => {
            rover.process('R')

            expect(rover.position).toBe('4 4 N')
        })

        test('Faces South when turning to the left', () => {
            rover.process('L')

            expect(rover.position).toBe('4 4 S')
        })
    })
})

describe('Can compute the entire route', () => {

    test('Should detect a command path that goes out-of-bounds', () => {
        let actual = () => new Rover({
            zone: '3 3',
            start: '2 2 S',
            commands: 'MMMMML'
        }).process()

        expect(actual).toThrowError('Out of bounds')
    })

    test('Should correctly compute our test case', () => {
        let actual = new Rover({
            zone: '8 8',
            start: '1 2 E',
            commands: 'MMLMRMMRRMML'
        }).process()

        expect(actual.position).toBe('3 3 S')
    })

})