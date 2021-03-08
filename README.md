# Asteroids
This is a simple implementation of the [Asteroids](https://en.wikipedia.org/wiki/Asteroids_(video_game)) videogame using [Phaser](https://phaser.io/).

- Each time you hit an asteroid, it breaks down into smaller and faster pieces. Try not to be hit! 
- The game is over when you have no more lives or if you destroy all the asteroids.
- Your highest score is saved on your browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Goals
- Leverage TypeScript's type system on Phaser objects as much as possible. :rocket:
- Learning to make a Phaser videogame testable (this is the hard part! :sweat_smile:)
- Automated testing with [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome), [Karma](https://karma-runner.github.io/latest/index.html), [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) :metal:

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