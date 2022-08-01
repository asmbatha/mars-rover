#!/usr/bin/env node
"use strict";

import fs from 'fs'
import handlers from "../service/state-handlers/index.js"
import { StateMachine } from '../service/StateMachine.js';

try {
    const machine = new StateMachine({
        onEntry: state => {
            try {
                if (state.name in handlers) handlers[state.name](machine)
            } catch (error) {
                console.error('Error while calling state handler', { error, state })
            }
        },
        state: 'extract-instructions',
        // debug: true
    })

    function readData(source) {
        return fs.readFileSync(source, 'utf8').toString()
    }

    machine.context.file = readData(process.argv[2] || 0)

    machine.start()
} catch (error) {
    process.stderr.write(error.error + '\n')
    process.exit(1)
}
