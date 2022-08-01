import Rover from "../rover.js"

export default async (stateMachine) => {
    try {
        stateMachine.context.rover = new Rover(stateMachine.context)

        stateMachine.action('next')
    } catch (error) {
        stateMachine.context.error = error
        stateMachine.action('error')
    }
}