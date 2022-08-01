export default async (stateMachine) => {
    try {
        const { x, y, direction } = stateMachine.context.position
        process.stdout.write(`${x} ${y} ${direction}\n`)
    } catch (error) {
        stateMachine.context.error = error
        stateMachine.action('error')
    }
}