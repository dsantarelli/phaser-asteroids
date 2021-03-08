import { Fonts } from '../graphics/fonts';
import { Scene } from './scene';
import { GameScene } from './game-scene';

export class MainMenuScene extends Scene {

  public static readonly KEY = 'MainMenuScene';

  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super(MainMenuScene.KEY);
  }

  init(): void {    
    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.playerData.restoreLives();
  }

  create(): void {
  
    this.bitmapTexts.push(
      Fonts.ALTERNITY.addBitmapTextOn(this,
        this.sys.canvas.width / 2 - 330,
        this.sys.canvas.height / 2 - 120,        
        'A S T E R O I D S',
        80
      )
    );

    this.bitmapTexts.push(
      Fonts.ARCADE_CLASSIC.addBitmapTextOn(this,
        this.sys.canvas.width / 2 - 195,
        this.sys.canvas.height / 2 + 20,        
        'PRESS      S     TO   PLAY',
        45
      )
    );

    this.bitmapTexts.push(
      Fonts.ARCADE_CLASSIC.addBitmapTextOn(this,
        this.sys.canvas.width / 2 - 155,
        this.sys.canvas.height / 2 + 80,        
        'HIGHEST   SCORE    ' + this.playerData.highestScore,
        30
      )
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start(GameScene.KEY);
    }
  }
}
