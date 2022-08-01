export default async (stateMachine) => {
    try {
        const [zone, start, commands] = stateMachine.context.file.split('\n')

        stateMachine.context.instructions = { zone, start, commands }

        stateMachine.action('next')
    } catch (error) {
        stateMachine.context.error = error
        stateMachine.action('error')
    }
}