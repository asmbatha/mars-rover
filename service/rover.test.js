import Rover from './Rover.js'

// test single operations
describe('Can perform basic operations', () => {
    describe('North', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: {
                    x: 8,
                    y: 8
                },
                instructions: {
                    start: '4 4 N',
                    commands: ''
                }
            })
        })

        test('Moves up when facing North', () => {
            rover.navigate('M')

            expect(rover.position).toEqual({
                x: 4,
                y: 5,
                direction: 'N'
            })
        })

        test('Faces East when turning to the right', () => {
            rover.navigate('R')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'E'
            })
        })

        test('Faces West when turning to the left', () => {
            rover.navigate('L')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'W'
            })
        })
    })

    describe('East', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: {
                    x: 8,
                    y: 8
                },
                instructions: {
                    start: '4 4 E',
                    commands: ''
                }
            })
        })

        test('Moves towards the right when facing East', () => {
            rover.navigate('M')

            expect(rover.position).toEqual({
                x: 5,
                y: 4,
                direction: 'E'
            })
        })

        test('Faces South when turning to the right', () => {
            rover.navigate('R')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'S'
            })
        })

        test('Faces North when turning to the left', () => {
            rover.navigate('L')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'N'
            })
        })
    })

    describe('South', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: {
                    x: 8,
                    y: 8
                },
                instructions: {
                    start: '4 4 S',
                    commands: ''
                }
            })
        })

        test('Moves down when facing South', () => {
            rover.navigate('M')

            expect(rover.position).toEqual({
                x: 4,
                y: 3,
                direction: 'S'
            })
        })

        test('Faces West when turning to the right', () => {
            rover.navigate('R')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'W'
            })
        })

        test('Faces East when turning to the left', () => {
            rover.navigate('L')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'E'
            })
        })
    })

    describe('West', () => {
        let rover
        beforeEach(() => {
            rover = new Rover({
                zone: {
                    x: 8,
                    y: 8
                },
                instructions: {
                    start: '4 4 W',
                    commands: ''
                }
            })
        })

        test('Moves left when facing West', () => {
            rover.navigate('M')

            expect(rover.position).toEqual({
                x: 3,
                y: 4,
                direction: 'W'
            })
        })

        test('Faces North when turning to the right', () => {
            rover.navigate('R')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'N'
            })
        })

        test('Faces South when turning to the left', () => {
            rover.navigate('L')

            expect(rover.position).toEqual({
                x: 4,
                y: 4,
                direction: 'S'
            })
        })
    })
})

describe('Can compute the entire route', () => {

    test('Should correctly compute our test case', async () => {
        let actual = new Rover({
            zone: {
                x: 8,
                y: 8
            },
            instructions: {
                start: '1 2 E'
            }
        })

        await actual.navigate('MMLMRMMRRMML')

        expect(actual.position).toEqual({
            x: 3,
            y: 3,
            direction: 'S'
        })
    })

})