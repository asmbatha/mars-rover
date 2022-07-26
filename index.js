import fs from 'fs'
import Rover from './rover.js'

const fileName = './commands.txt'

const [zone, start, commands] = fs.readFileSync(fileName, 'utf8').toString().split('\n')

try {
    const rover = new Rover({ zone, start, commands }).process()
    console.log(rover.position)

} catch (error) {
    console.error(error.message)
}
