import fs from 'fs'
import Rover from './rover.js'

const fileName = './commands.txt'

const [zone, start, commands] = fs.readFileSync(fileName, 'utf8').toString().split('\n')

console.log(Rover({ zone, start, commands }).location)
