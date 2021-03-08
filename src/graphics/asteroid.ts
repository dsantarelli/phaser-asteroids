import { Scene } from '../scenes/scene';
import { MathUtils } from '../util/math';
import { AsteroidSize } from './asteroid-size';
import { Colors } from './colors';

export class Asteroid extends Phaser.GameObjects.Graphics {
  
  private readonly _velocity: Phaser.Math.Vector2;
  private readonly _shipSize: number;
  private readonly _rotationAngleOffset: number;

  readonly size: AsteroidSize;

  body: Phaser.Physics.Arcade.Body;  
  public getBody(): any {
    return this.body;
  }

  constructor(
      scene: Scene, 
      size: AsteroidSize,       
      graphicsOptions: Phaser.Types.GameObjects.Graphics.Options) 
  {
    super(scene, graphicsOptions);    
    this.size = size;
    this._shipSize = scene.settings.ship.size;
    this._rotationAngleOffset = scene.settings.asteroids.rotationAngleOffset;
    const numberOfSides = scene.settings.asteroids.numberOfSides;
    const asteroidSettings = scene.settings.asteroids.getTypeBySize(size);
    this._velocity = MathUtils.getRandomVector2(asteroidSettings.minSpeed, asteroidSettings.maxSpeed);
    
    const points: Phaser.Math.Vector2[] = [];    
    let bodyRadius = 0;
        
    for (let i = 0; i < numberOfSides; i++) {
      
      const rnd = Phaser.Math.RND.between(asteroidSettings.minSize, asteroidSettings.maxSize);
      let pX = rnd * Math.cos((2 * Math.PI * i) / numberOfSides);
      let pY = rnd * Math.sin((2 * Math.PI * i) / numberOfSides);
      points.push(new Phaser.Math.Vector2(pX, pY));

      if (rnd > bodyRadius) {
        bodyRadius = rnd;
      }
    }

    this.lineStyle(1, Colors.WHITE);
    
    for (let p = 0; p < points.length; p++) {
      this.beginPath();
      this.moveTo(points[p].x, points[p].y);
      if (p + 1 < points.length) {
        this.lineTo(points[p + 1].x, points[p + 1].y);
      } else {
        this.lineTo(points[0].x, points[0].y);
      }
      this.strokePath();
    }

    this.x = graphicsOptions.x;
    this.y = graphicsOptions.y;
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setCircle(bodyRadius);
    this.body.setOffset(-bodyRadius, -bodyRadius);
    this.scene.add.existing(this);
  }

  public update(): void {
    this.applyForces();
    this.checkIfOffScreen();
  }

  private applyForces(): void {
    this.x += this._velocity.x;
    this.y += this._velocity.y;
    this.rotation += this._rotationAngleOffset;
  }

  private checkIfOffScreen(): void {

    // horizontal check
    if (this.x > this.scene.sys.canvas.width + this._shipSize) {
      this.x = -this._shipSize;
    } else if (this.x < -this._shipSize) {
      this.x = this.scene.sys.canvas.width + this._shipSize;
    }

    // vertical check
    if (this.y > this.scene.sys.canvas.height + this._shipSize) {
      this.y = -this._shipSize;
    } else if (this.y < -this._shipSize) {
      this.y = this.scene.sys.canvas.height + this._shipSize;
    }
  }
}
