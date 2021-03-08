
import { assert } from 'chai';
import { Game } from '../src/game';
import { DefaultGameSettings } from '../src/settings/default-game-settings';
import { BootScene } from '../src/scenes/boot-scene';
import { GameScene } from '../src/scenes/game-scene';
import { MainMenuScene } from '../src/scenes/main-menu-scene';
import { HeadlessBrowser } from './headless-browser';
import { AsteroidSize } from '../src/graphics/asteroid-size';

HeadlessBrowser.onGameStarted((game: Game) => {

    describe('Asteroids game', () => {

        const defaultGameScene = (): GameScene => {
            return game.scene.keys['default'] as GameScene;
        }

        const defaultGameSettings = new DefaultGameSettings();

        it('is booted and running', () => {
            assert.isTrue(game.isBooted);
            assert.isTrue(game.isRunning);
        });

        it('has loaded all the scenes', () => {
            assert.equal(3, game.scene.scenes.length);
            assert.instanceOf(game.scene.scenes[0], BootScene);
            assert.instanceOf(game.scene.scenes[1], MainMenuScene);
            assert.instanceOf(game.scene.scenes[2], GameScene);
        });

        it('is showing the default scene', () => {
            const gameScene = defaultGameScene();
            assert.isDefined(gameScene);
            assert.instanceOf(gameScene, GameScene);
        });

        it('is displaying the stationary ship in the center of the screen', () => {
            const scene = defaultGameScene();
            assert.isDefined(scene.ship);
            assert.equal(scene.ship.x, scene.sys.canvas.width / 2);
            assert.equal(scene.ship.y, scene.sys.canvas.height / 2);
            assert.equal(scene.ship.velocity.x, 0);
            assert.equal(scene.ship.velocity.y, 0);
            assert.isDefined(scene.ship.getBody());
        });

        it('is displaying a not shooting ship', () => {
            const scene = defaultGameScene();
            assert.isDefined(scene.ship);
            assert.isFalse(scene.ship.isShooting());
            assert.equal(scene.ship.bullets.length, 0);
        });

        it('is displaying a not hit ship', () => {
            const scene = defaultGameScene();
            assert.isFalse(scene.shipGotHit);
        });

        it('is displaying score zero', () => {
            const scene = defaultGameScene();
            assert.equal(scene.score, 0);
        });

        it('has a player with at least one life', () => {
            const gameScene = defaultGameScene();
            assert.isDefined(gameScene.playerData);
            assert.isTrue(gameScene.playerData.lives > 0);
        });

        it('is displaying the default number of asteroids', () => {
            const scene = defaultGameScene();
            assert.isDefined(scene.asteroids);
            assert.equal(scene.asteroids.length, defaultGameSettings.asteroids.initialCount);
        });

        it('is displaying only large asteroids', () => {
            const scene = defaultGameScene();
            scene.asteroids.forEach(asteroid => {
                assert.isDefined(asteroid.getBody());
                assert.isTrue(asteroid.size == AsteroidSize.LARGE);
            });
        });

        it('is displaying a not hit ship after the first scene update', () => {
            const scene = defaultGameScene();
            scene.update();
            assert.isFalse(scene.shipGotHit);
        });
    });

    Mocha.run();
});

