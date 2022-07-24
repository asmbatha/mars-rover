import Rover from './Rover.js'

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
            commands: ''
        }
    })

    test('Should return error for incorrectly formatted zone', () => {
        let actual = () => Rover({
            ...config,
            zone: '11'
        })
        expect(actual).toThrowError('Zone should be in the format `X Y`, and should both be numbers > 0')
    })

    test('Should return error for invalid zone', () => {
        let actual = () => Rover({
            ...config,
            zone: 'X 10'
        })
        expect(actual).toThrowError('Zone should be in the format `X Y`, and should both be numbers > 0')
    })

    test('Should correctly initialize the zone', () => {
        let actual = Rover({
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
        let actual = () => Rover({
            ...config,
            start: '11D'
        })
        expect(actual).toThrowError('Starting position should be in the format `[number] [number] [N|E|W|S]`')
    })

    test('Should return error for invalid starting postion or direction', () => {
        let actual = () => Rover({
            ...config,
            start: '1 10 D'
        })

        expect(actual).toThrowError('Starting position should be in the format `[number] [number] [N|E|W|S]`')
    })

    test('Should return error for if the starting position is out of bounds', () => {
        let actual = () => Rover({
            ...config,
            start: '1 10 W'
        })
        expect(actual).toThrowError('Starting position is out of bounds')
    })

    test('Should correctly set the starting postion', () => {
        let actual = Rover({
            ...config,
            start: '1 2 E',
            commands: ''
        })

        expect(actual).toMatchObject({
            position: {
                x: 1,
                y: 2,
                direction: 'E'
            }
        })
    })
})


// commands
// Contains only valid commands
describe('Navigation Commands', () => {
    test('Should return error for invalid commands', () => {
        let actual = () => Rover({
            ...config,
            commands: 'ADVDSCV'
        })
        expect(actual).toThrowError('The only valid commands are M, L, and R')
    })

    test('Should accept valid commands', () => {
        let actual = Rover({
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
    describe('North', () => {

        beforeEach(() => {
            config = {
                zone: '8 8',
                start: '4 4 N',
                commands: ''
            }
        })

        test('Moves up when facing North', () => {
            let actual = Rover({
                ...config,
                commands: 'M'
            })

            expect(actual.location).toBe('4 5 N')
        })

        test('Faces East when turning to the right', () => {
            let actual = Rover({
                ...config,
                commands: 'R'
            })

            expect(actual.location).toBe('4 4 E')
        })

        test('Faces West when turning to the left', () => {
            let actual = Rover({
                ...config,
                commands: 'L'
            })

            expect(actual.location).toBe('4 4 W')
        })
    })

    describe('East', () => {
        beforeEach(() => {
            config = {
                zone: '8 8',
                start: '4 4 E',
                commands: ''
            }
        })

        test('Moves towards the right when facing East', () => {
            let actual = Rover({
                ...config,
                commands: 'M'
            })

            expect(actual.location).toBe('5 4 E')
        })

        test('Faces South when turning to the right', () => {
            let actual = Rover({
                ...config,
                commands: 'R'
            })

            expect(actual.location).toBe('4 4 S')
        })

        test('Faces North when turning to the left', () => {
            let actual = Rover({
                ...config,
                commands: 'L'
            })

            expect(actual.location).toBe('4 4 N')
        })
    })

    describe('South', () => {
        beforeEach(() => {
            config = {
                zone: '8 8',
                start: '4 4 S',
                commands: ''
            }
        })

        test('Moves down when facing South', () => {
            let actual = Rover({
                ...config,
                commands: 'M'
            })

            expect(actual.location).toBe('4 3 S')
        })

        test('Faces West when turning to the right', () => {
            let actual = Rover({
                ...config,
                commands: 'R'
            })

            expect(actual.location).toBe('4 4 W')
        })

        test('Faces East when turning to the left', () => {
            let actual = Rover({
                ...config,
                commands: 'L'
            })

            expect(actual.location).toBe('4 4 E')
        })
    })

    describe('West', () => {
        beforeEach(() => {
            config = {
                zone: '8 8',
                start: '4 4 W',
                commands: ''
            }
        })

        test('Moves left when facing West', () => {
            let actual = Rover({
                ...config,
                commands: 'M'
            })

            expect(actual.location).toBe('3 4 W')
        })

        test('Faces North when turning to the right', () => {
            let actual = Rover({
                ...config,
                commands: 'R'
            })

            expect(actual.location).toBe('4 4 N')
        })

        test('Faces South when turning to the left', () => {
            let actual = Rover({
                ...config,
                commands: 'L'
            })

            expect(actual.location).toBe('4 4 S')
        })
    })


    test('Should detect a command path that goes out-of-bounds', () => {
        let actual = () => Rover({
            zone: '3 3',
            start: '2 2 S',
            commands: 'MMMMML'
        })

        expect(actual).toThrowError('The commands go out of bounds')
    })

    test('Should correctly compute our test case', () => {
        let actual = Rover({
            zone: '8 8',
            start: '1 2 E',
            commands: 'MMLMRMMRRMML'
        })

        expect(actual.location).toBe('3 3 S')
    })
})

