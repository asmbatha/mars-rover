export class StateMachine {
    #currentState = ''
    context = {}

    constructor(config = {}) {
        try {
            this.state = config?.state ?? 'file-input'

            if ('onEntry' in config) this.onEntry = config.onEntry.bind(this)

        } catch (error) {
            console.error(
                'Error while initializing StateMachine',
                { error }
            )
        }
    }

    start() {
        this.onEntry(this.state)
    }

    #states = {
        'load-file': {
            error: 'show-error',
            next: 'initialize'
        },
        'initialize': {
            error: 'show-error',
            next: 'simulate'
        },
        'simulate': {},
        'show-error': {},
    }

    get state() {
        return {
            name: this.#currentState,
            actions: this.#states[this.#currentState]
        }
    }

    set state(name) {
        this.#currentState = name
    }

    action(action) {
        try {
            this.state = this.state.actions[action]
            this.onEntry(this.state)
            return this.state
        } catch (error) {
            console.error('Error while executing state actions', {
                state: this.state,
                action
            })
        }
    }

    onEntry() { }
}