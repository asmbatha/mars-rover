export default async (stateMachine) => {
    process.stderr.write(stateMachine.context.error.message + '\n')
}