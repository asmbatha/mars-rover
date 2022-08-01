export default async (stateMachine) => {
    try {
        let commands = stateMachine.context.instructions.commands
        const rover = stateMachine.context.rover

        rover.onUpdated = position => {
            stateMachine.context.position = position
        }

        await rover.navigate(commands, 0)

        stateMachine.action('next')

    } catch (error) {
        stateMachine.context.error = error
        stateMachine.action('error')
    }
}