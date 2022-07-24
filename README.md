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

* Design a program which takes a text file in the format as described above and then displays its resulting rover location to the console.
* Include a README with:
  - Clear instructions on how to use your program.
  - A brief description of the design decisions made in your program
  - How you have ensured your code’s correctness.
* Also include The input to your program (as described above) as well as any additional inputs.

# Installation

# Usage

# Software Design

# Testing