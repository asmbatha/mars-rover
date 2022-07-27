export const stateMachine = {
    currentState: 'load-file',
    context: {},
    states: {
        'load-file': {
            onError: 'show-error',
            onNext: 'set-zone'
        },
        'set-zone': {
            onError: 'show-error',
            onNext: 'set-start'
        },
        'set-start': {
            onError: 'show-error',
            onNext: 'simulate'
        },
        'simulate': {
            onError: 'show-error',
            onNext: 'set-start'
        },
        'show-error': {
            onNext: 'load-file'
        },
    },
    get state() {
        const actions = this.states[this.currentState]
        return {
            name: this.currentState,
            actions
        }
    },
    set state(name) {
        this.currentState = name
    },
    get next() {
        this.state = this.state.actions.onNext
        return this.state
    },
    get error() {
        this.state = this.state.actions.onError
        return this.state
    }
}