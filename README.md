# Mars Rover Challenge

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

## Tasks

> Create a navigation system

* Design a program which takes a text file in the format as described above and then displays its resulting rover location to the console.
* Include a README with:
  - Clear instructions on how to use your program.
  - A brief description of the design decisions made in your program
  - How you have ensured your code’s correctness.
* Also include The input to your program (as described above) as well as any additional inputs.

## System Components

* Rover navigation engine
    - Javascript Class that perfoms the navigation computation
    - Will be unit tested to catch errors and guarantee expected behaviour
    - We will developed using the TDD methodology
* Command file
    - A text that contains a list of commands as described above
* Node executable script
    - Reads the contents of the commands file and send it to the Rover engine for execution.
* Bonus maybe: 🤷🏽‍♂️
    - Browser interface
        - File upload
        - Navigation visualization

## Roadmap

- [ ] Testing environment
- [ ] Write tests
- [ ] Rover navigation engine
- [ ] Node executable script
- [ ] Interface with file upload
- [ ] Navigation visualization
- [ ] Review and update README

## Usage

### Installation
```
npm i
```

### Run from command line

### Run from browser

### Testing
```
npm test
```