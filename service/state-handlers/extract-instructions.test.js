import handler from './extract-instructions.js'
import { StateMachine } from '../StateMachine.js'

const stateMachine = new StateMachine()

test('Should correctly extract instructions', async () => {
    stateMachine.state = 'extract-instructions'
    stateMachine.context = {
        file: '8 8\n1 1 E\n'
    }

    await handler(stateMachine)

    expect(stateMachine.context.instructions).toEqual({
        zone: '8 8',
        start: '1 1 E',
        commands: ''
    })
})