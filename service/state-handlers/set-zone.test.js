import handler from './set-zone.js'
import { StateMachine } from '../StateMachine.js'

const stateMachine = new StateMachine()

test('Should correctly initialize the zone', async () => {
    stateMachine.state = 'set-zone'

    stateMachine.context = {
        instructions: {
            zone: '8 8'
        }
    }

    await handler(stateMachine)

    expect(stateMachine.context.zone).toEqual({
        x: 8,
        y: 8
    })
})