# code_foo_9

Hello! This repository will hold my files related to IGN's Code Foo 9.

## Introduction

You can find me all alone in the Introduction folder. Haha, so if you happen to see this before downloading and reading the introduction from the actual application form, read it here instead. There were some errors that I hadn't yet fixed. If you already read that other one, it's fine. Close enough.

## Required Question 2

You can find me all alone in the Coit Tower folder.

## Required Question 3

Files for question 3 may be found in the optimal armor set calc folder. Included is a standalone javascript program that displays the result in the console and a text file that discusses its implementation.

## Option 1 - Front End

Files for option 1 may be found in the FE Web Page folder. Everything in this folder is linked together so to open the webpage, simply open the HTML in a browser. However, there is something you will need to do first.

### Prerequisites

To function properly as is, you will need to install CORS Anywhere. In short, CORS Anywhere was the solution to my cross-origin requests to IGN' API being blocked. You can read more about it [here] (https://github.com/Rob--W/cors-anywhere).

1. Install [Node.js] (http://nodejs.org/)
2. Install CORS Anywhere. Navigate to the FE Web Page directory. At a command prompt, enter
`npm install cors-anywhere`
This will install CORS Anywhere under the current directory, in `node_modules\cors-anywhere`
3. Run CORS Anywhere. Navigate to the cors-anywhere directory (wherever you put this\FE Web Page\node_modules\cors-anywhere) At a command prompt, enter
`node server.js`
Cors Anywhere should respond with a message like `Running CORS Anywhere on 0.0.0.0:8080`

And with that, you should be able to open the original HTML file for the web page, now with data pulled from IGN's API.

### Known Issue (?)

The height of each HTML article depends on the dimensions of the thumbnail contained. This should be okay since there seems to be an intention to have all thumbnails of a type (such as large) have the same dimensions. However, if a thumbnail with different dimensions, or perhaps only a different aspect ratio, was placed into the API, the result would be predicted or expected but perhaps not desired. As it would be expected, I do not see this as a bug within the program but rather a weakness or a fault.

## Option 4 - Full Stack

Although I have some files for option 4, these are not meant to be evaluated. At the time of writing this, I do not feel like I have enough time remaining before the application deadline to do a great or thorough job on this section. All files within the chat apps folder were made by (very) closely following tutorials and I would not even call them my own. They have been posted here for my own reference as they are still materials related to this option.

### Dependencies

#### Socket
Requires socket.io and express

#### Medium
Requires pusher, express, body-parser

## Optional Bonus

For the bonus exercise, I made a game of Mancala. All you have to do to run it is open the HTML file from a folder that also contains the other files it comes with and you will be able to play in your browser. There are many variants on the rules of the game but this [webpage](https://www.thesprucecrafts.com/how-to-play-mancala-409424) has a set that matches my implementation.
