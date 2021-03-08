import { Bullet } from './bullet';
import { Colors } from './colors';
import { Scene } from '../scenes/scene';

export class Ship extends Phaser.GameObjects.Graphics {

  private readonly _shipSize: number;
  private readonly _rotationAngleOffset: number;
  private readonly _decelerationScale: number;
  private readonly _boostScale: number;
  private readonly _recoilScale: number;
  private readonly _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly _shootKey: Phaser.Input.Keyboard.Key;  
  
  readonly velocity: Phaser.Math.Vector2;

  body: Phaser.Physics.Arcade.Body;
  public getBody(): any {
    return this.body;
  }

  private _isShooting: boolean = false;
  public isShooting(): boolean {
    return this._isShooting;
  }

  readonly bullets: Bullet[] = [];

  constructor(scene: Scene) {
    super(scene);
    this._shipSize = scene.settings.ship.size;
    this._rotationAngleOffset = scene.settings.ship.rotationAngleOffset;
    this._decelerationScale = scene.settings.ship.decelerationScale;
    this._boostScale = scene.settings.ship.boostScale;
    this._recoilScale = scene.settings.ship.recoilScale;
    this._cursors = this.scene.input.keyboard.createCursorKeys();
    this._shootKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.x = this.scene.sys.canvas.width / 2;
    this.y = this.scene.sys.canvas.height / 2;
    this.velocity = new Phaser.Math.Vector2(0, 0);
    this.lineStyle(1, Colors.WHITE);
    this.strokeTriangle(-this._shipSize, this._shipSize, this._shipSize, this._shipSize, 0, -this._shipSize);
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(this._shipSize * 2, this._shipSize * 2);
    this.body.setOffset(-this._shipSize, -this._shipSize);
    this.scene.add.existing(this);
  }

  update(): void {
    if (this.active) {
      this.handleInput();
    }
    this.move();
    this.checkIfOffScreen();
    this.updateBullets();
  }

  private handleInput(): void {
    if (this._cursors.up.isDown) {
      this.boost();
    }

    if (this._cursors.right.isDown) {
      this.rotation += this._rotationAngleOffset;
    } else if (this._cursors.left.isDown) {
      this.rotation -= this._rotationAngleOffset;
    }

    if (this._shootKey.isDown && !this._isShooting) {
      this.shoot();
      this.recoil();
      this._isShooting = true;
    }

    if (this._shootKey.isUp) {
      this._isShooting = false;
    }
  }

  private move(): void {    
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.scale(this._decelerationScale);
  }

  private boost(): void {
    this.applyForce(true, this._boostScale);
  }

  private recoil(): void {    
    this.applyForce(false, this._recoilScale);    
  }

  private applyForce(positive: boolean, scale: number): void {
    const n = positive ? 1 : -1;
    const force = new Phaser.Math.Vector2(
      Math.cos(this.rotation - Math.PI / 2) * n,
      Math.sin(this.rotation - Math.PI / 2) * n
    );
    force.scale(scale);
    this.velocity.add(force);
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

  private shoot(): void {
    this.bullets.push(
      new Bullet(this.scene as Scene, this.rotation, {
        x: this.x,
        y: this.y
      })
    );
  }

  private updateBullets(): void {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].active) {
        this.bullets[i].update();
      } else {
        this.bullets[i].destroy();
        this.bullets.splice(i, 1);
      }
    }
  }
}
