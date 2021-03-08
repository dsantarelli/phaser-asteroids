import { Scene } from "../scenes/scene";
import { Colors } from "./colors";

export class Bullet extends Phaser.GameObjects.Graphics {

  private _velocity: Phaser.Math.Vector2;
  private _lifeSpan: number;
  private _isOffScreen: boolean = false;

  body: Phaser.Physics.Arcade.Body;
  public getBody(): any {
    return this.body;
  }

  constructor(
    scene: Scene, 
    rotation: number,
    graphicsOptions: Phaser.Types.GameObjects.Graphics.Options) 
  {
    super(scene, graphicsOptions);
    this._lifeSpan = scene.settings.bullets.lifeSpan;
    this.x = graphicsOptions.x;
    this.y = graphicsOptions.y;

    const velocityFactor = scene.settings.bullets.velocityFactor;
    this._velocity = new Phaser.Math.Vector2(
      velocityFactor * Math.cos(rotation - Math.PI / 2),
      velocityFactor * Math.sin(rotation - Math.PI / 2)
    );

    const radius = scene.settings.bullets.radius;
    this.fillStyle(Colors.WHITE, 1);
    this.fillCircle(0, 0, radius);
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setCircle(radius);
    this.body.setOffset(-radius, -radius);
    this.scene.add.existing(this);
  }

  update(): void {

    this.x += this._velocity.x;
    this.y += this._velocity.y;

    if (this._lifeSpan < 0 || this._isOffScreen) {
      this.setActive(false);
    } else {
      this._lifeSpan--;
    }

    this.checkIfOffScreen();
  }

  private checkIfOffScreen(): void {
    if (
      this.x > this.scene.sys.canvas.width + 1 ||
      this.y > this.scene.sys.canvas.height + 1
    ) {
      this._isOffScreen = true;
    }
  }
}
