export default async (stateMachine) => {
    try {
        console.log({ stateMachine })
        const [zone, start, commands] = stateMachine.context.file.split('\n')

        stateMachine.context.instructions = { zone, start, commands }

        stateMachine.action('next')
    } catch (error) {
        console.error('error in extract-instructions')
        stateMachine.context.error = error
        stateMachine.action('error')
    }
}