# Mars Rover Challenge
![Visualiser](/Screenshot.png)

[MarsRover.pdf](MarsRover.pdf) contains a brief about the problem.

## Problem summary

* A rover is on a grid zone.
* A position on the zone is identified by x:y coordinates
* The rover understands and can face the cardinal points of the zone
  * E - East
  * W - West
  * N - North
  * S - South
* The rover understands three commands:
  * M - Move one space forward in the direction it is facing
  * R - rotate 90 degrees to the right
  * L - rotate 90 degrees to the left
* You can communicate with the rover by sending a list of commands

> 8 8  
1 2 E  
MMLMRMMRRMML

This is how the rover will interpret each line
1. Size/Boundry of the zone.  
   `8 8` = `x y`
2. Starting position and direction
   `1 2 E` = `x y direction`
3. List of commands (movements and rotations)

## System Components

![State diagram](/state-diagram.png)

* State Machine
* Rover navigation simulator
* Nodejs CLI
* Browser Visualiser

## Usage

### Installation
To install in local directory
```
$ npm install
```

To install as a CLI application
```
$ npm install -g
```

You can then execute it in your terminal by passing an instructions file as an argument
e.g.
```sh
$ mars-rover ./resources/instructions.txt
```
You can also pipe in a file as stdin
```sh
$ curl -s "https://yourdonamin.api/input.txt" | mars-rover
```


### Run from command line
Run with demo instructions file
```sh
$ npm start
```
Run with your own instructions file
```sh
$ node . [FILE_NAME]
```

![cli-sequence-diagram](/cli-sequence-diagram.png)

### Run from browser
```
$ npm run visualiser
```

![browser-sequence-diagram](/browser-sequence-diagram.png)
### Testing
```
$ npm test
```
Or
```
$ npm run tdd
```