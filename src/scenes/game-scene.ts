import { Asteroid } from '../graphics/asteroid';
import { Ship } from '../graphics/ship';
import { MainMenuScene } from './main-menu-scene';
import { Scene } from './scene';
import { AsteroidSize } from '../graphics/asteroid-size';
import { Fonts } from '../graphics/fonts';

export class GameScene extends Scene {

  public static readonly KEY = 'GameScene';

  private _asteroidFragmentsCount: number;
  private _bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  private _asteroids: Asteroid[] = [];
  public get asteroids(): Asteroid[] {
    return this._asteroids;
  }

  private _ship: Ship;
  public get ship(): Ship {
    return this._ship;
  }

  private _shipGotHit: boolean = false;
  public get shipGotHit(): boolean {
    return this._shipGotHit;
  }

  private _score: number = 0;
  public get score(): number {
    return this._score;
  }

  constructor() {
    super(GameScene.KEY);
  }

  create(): void {
    this._ship = new Ship(this);
    this._asteroids = [];
    this._bitmapTexts = [];
    this._shipGotHit = false;
    this._score = 0;
    this._asteroidFragmentsCount = this.settings.asteroids.fragmentsCount;
    this.spawnAsteroids(this.settings.asteroids.initialCount, AsteroidSize.LARGE);
    this._bitmapTexts.push(Fonts.ARCADE_CLASSIC.addBitmapTextOn(this, this.sys.canvas.width - 180, 5, this.formatScore(), 30));
    this._bitmapTexts.push(Fonts.ARCADE_CLASSIC.addBitmapTextOn(this, 30, 5, this.formatLives(), 30));
  }

  update(): void {
    this._ship.update();
    this.checkCollisionsBetweenAsteroidsAndShip();
    this.checkCollisionsBetweenAsteroidsAndBullets();
  }

  private checkCollisionsBetweenAsteroidsAndBullets(): void {
    var i = this._asteroids.length;
    while (i--) {
      const asteroid = this._asteroids[i];

      for (const bullet of this._ship.bullets) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBody(), asteroid.getBody())) {
          bullet.setActive(false);
          asteroid.setActive(false);
          this.updateScore(asteroid.size);
        }
      }

      asteroid.update();

      if (asteroid.active === false) {
        this.spawnAsteroids(this._asteroidFragmentsCount, asteroid.size - 1, asteroid.x, asteroid.y);
        asteroid.destroy();
        this._asteroids.splice(i, 1);
      }
    }
  }

  private checkCollisionsBetweenAsteroidsAndShip(): void {

    for (let i = 0; i < this._asteroids.length; i++) {
      if (Phaser.Geom.Intersects.RectangleToRectangle(this._asteroids[i].getBody(), this._ship.getBody())) {
        this._ship.setActive(false);
        this._shipGotHit = true;
        break;
      }
    }

    if (this._shipGotHit) {
      this.playerData.loseLife();
      if (this.playerData.lives > 0) {
        this.saveScoreAndGoToScene(GameScene.KEY);
      } else {
        this.saveScoreAndGoToScene(MainMenuScene.KEY);
      }
    }

    if (this._asteroids.length === 0) {
      this.saveScoreAndGoToScene(MainMenuScene.KEY);
    }
  }

  private spawnAsteroids(amount: number, size: AsteroidSize, x?: number, y?: number) {
    if (size > 0) {
      for (let i = 0; i < amount; i++) {
        this._asteroids.push(
          new Asteroid(this, size, {
            x: x === undefined ? this.getRandomSpawnPostion(this.sys.canvas.width) : x,
            y: y === undefined ? this.getRandomSpawnPostion(this.sys.canvas.height) : y
          })
        );
      }
    }
  }

  private updateScore(asteroidSize: AsteroidSize) {
    this._score += this.settings.asteroids.getScoreBySize(asteroidSize);
    this._bitmapTexts[0].text = this.formatScore();
  }

  private saveScoreAndGoToScene(sceneKey: string) {
    this.playerData.saveScore(this._score);    
    this.scene.start(sceneKey);
  }

  private getRandomSpawnPostion(screenSize: number): number {
    let rndPos = Phaser.Math.RND.between(0, screenSize);
    while (rndPos > screenSize / 3 && rndPos < (screenSize * 2) / 3) {
      rndPos = Phaser.Math.RND.between(0, screenSize);
    }
    return rndPos;
  }

  private formatScore(): string {
    return `SCORE    ${this._score}`;
  }

  private formatLives(): string {
    return `LIVES    ${this.playerData.lives}`;
  }  
}
