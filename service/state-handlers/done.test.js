import handler from './done.js'
import { StateMachine } from '../StateMachine.js'

const stateMachine = new StateMachine()

describe('Done', () => {
    test('Should correctly write position to stdout', async () => {
        stateMachine.state = 'done'
        const { x, y, direction } = stateMachine.context.position = {
            x: 1,
            y: 1,
            direction: 'E'
        }

        jest.spyOn(process.stdout, 'write').mockImplementation()

        await handler(stateMachine)

        expect(process.stdout.write).toHaveBeenLastCalledWith(`${x} ${y} ${direction}\n`)
    })
})