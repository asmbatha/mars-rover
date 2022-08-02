import Rover from "../Rover.js"
import handler from './navigate.js'
import { StateMachine } from '../StateMachine.js'

const stateMachine = new StateMachine()

test('Should navigate correctly', async () => {
    stateMachine.state = 'navigate'
    stateMachine.context = {
        zone: {
            x: 8,
            y: 8
        },
        instructions: {
            start: '1 1 E',
            commands: 'MMLM'
        }
    }
    stateMachine.context.rover = new Rover(stateMachine.context)

    await handler(stateMachine)

    expect(stateMachine.context.rover.position).toEqual({
        x: 3,
        y: 2,
        direction: 'N'
    })
})