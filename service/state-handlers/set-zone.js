export default async (stateMachine) => {
    try {
        const { zone } = stateMachine.context.instructions
        const [x, y] = stateMachine.context.instructions.zone.split(' ')

        if (
            !!zone.match(/[^0-9 ]+/gm) ||
            isNaN(parseInt(x)) ||
            isNaN(parseInt(y)) ||
            Number(x) < 1 ||
            Number(y) < 1
        ) {
            throw new Error('Zone should be in the format `X Y`, and should both be numbers > 0')
        } else {
            stateMachine.context.zone = {
                x: Number(x),
                y: Number(y)
            }
        }

        stateMachine.action('next')
    } catch (error) {
        stateMachine.context.error = error
        stateMachine.action('error')
    }
}