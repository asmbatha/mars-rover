export class StateMachine {
    #currentState = ''
    context = {}
    debug = false

    constructor(config = {}) {
        try {
            this.state = config?.state ?? 'file-input'

            if ('onEntry' in config) this.onEntry = config.onEntry.bind(this)

            if ('debug' in config) this.debug = config.debug


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
        'extract-instructions': {
            error: 'show-error',
            next: 'set-zone'
        },
        'set-zone': {
            error: 'show-error',
            next: 'set-start'
        },
        'set-start': {
            error: 'show-error',
            next: 'navigate'
        },
        'navigate': {
            error: 'show-error',
            reset: 'set-start',
            next: 'done'
        },
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
        if (this.debug) {
            console.log('trasition', {
                state: this.state,
                context: this.context
            })
        }
    }

    action(action) {
        try {
            this.state = this.state.actions[action]
            this.onEntry(this.state)
            return this.state
        } catch (error) {
            console.error('Error while executing state actions', {
                state: this.state,
                action,
                error
            })
        }
    }

    onEntry() { }
}