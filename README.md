# Asteroids

This is a simple implementation of the [Asteroids](https://en.wikipedia.org/wiki/Asteroids_(video_game)) videogame using [Phaser](https://phaser.io/).

| Branch        | Build           | Coverage           |
| ------------- |:-------------:|:-------------:|
| main      	| [![Build Status](https://travis-ci.com/dsantarelli/phaser-asteroids.svg?branch=main)](https://travis-ci.com/dsantarelli/phaser-asteroids) | [![codecov](https://codecov.io/gh/dsantarelli/phaser-asteroids/branch/main/graph/badge.svg)](https://codecov.io/gh/dsantarelli/phaser-asteroids)

## Features
- Each time you hit an asteroid, it breaks down into smaller and faster pieces. Try not to be hit! 
- The game is over when you have no more lives or if you destroy all the asteroids.
- Your highest score is saved on your browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Development goals
- Leverage TypeScript's type system as much as possible. :rocket:
- Building and running game through [webpack](https://webpack.js.org/) <img src="https://emojis.slackmojis.com/emojis/images/1486450004/1706/webpack.png" width="16" height="16" />
- Learning how to make a Phaser videogame testable (this is the hard part! :sweat_smile:)
- Automated testing through [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome), [Karma](https://karma-runner.github.io/latest/index.html), [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) :metal:

## How to run

### 1. Install node.js and npm

https://nodejs.org/

### 2. Install dependencies (optionally you can install [yarn](https://yarnpkg.com/))

Run ```npm install``` or ```yarn```

### 3. Run the development server

Run ```npm run dev``` or  ```yarn run dev```

This will run a server so you can run the game in a browser. It will also start a watch process, so you can change the source and the process will recompile and refresh the browser automatically.
To run the game, open your browser and enter [http://localhost:8080/](http://localhost:8080/) into the address bar.

### 4. Run the tests

Run ```npm run test``` or ```yarn run test```

This will launch the Karma test runner using the Headless Chrome browser.