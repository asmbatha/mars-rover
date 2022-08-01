export default async (stateMachine) => {
    try {
        process.stderr.write(stateMachine.context.error.message + '\n')
    } catch (error) {
        window.alert(stateMachine.context.error)
    }
}