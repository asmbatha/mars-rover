import handler from './show-error.js'
import { StateMachine } from '../StateMachine.js'

const stateMachine = new StateMachine()

test('Should log the error and terminate the machine', async () => {
    stateMachine.state = 'show-error'
    const message = 'test error'
    stateMachine.context.error = new Error(message)
    jest.spyOn(process.stderr, 'write').mockImplementation()

    await handler(stateMachine)

    expect(process.stderr.write).toHaveBeenLastCalledWith(message + '\n')
})