import Rover from "../Rover.js"

export default async (stateMachine) => {
    try {
        if (stateMachine.context.rover) stateMachine.context.rover.stop()
        stateMachine.context.rover = new Rover(stateMachine.context)
        stateMachine.action('next')
    } catch (error) {
        stateMachine.context.error = error
        stateMachine.action('error')
    }
}