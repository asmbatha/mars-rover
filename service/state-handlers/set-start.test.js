import handler from './set-start.js'
import { StateMachine } from '../StateMachine.js'

const stateMachine = new StateMachine()

test('Should correctly initialize the rover simulator', async () => {
    stateMachine.state = 'set-start'

    stateMachine.context = {
        zone: {
            x: 8,
            y: 8
        },
        instructions: {
            start: '1 1 E'
        }
    }

    await handler(stateMachine)

    expect(stateMachine.context.rover.position).toEqual({
        x: 1,
        y: 1,
        direction: 'E'
    })
})