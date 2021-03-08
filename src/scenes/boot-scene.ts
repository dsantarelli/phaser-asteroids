import { Scene } from "./scene";
import { MainMenuScene } from "./main-menu-scene";
import { Fonts } from "../graphics/fonts";

export class BootScene extends Scene {

  public static readonly KEY = 'BootScene';

  constructor() {
    super(BootScene.KEY);
  }

  preload(): void {
    Fonts.ARCADE_CLASSIC.loadOn(this);
    Fonts.ALTERNITY.loadOn(this);
  }

  update(): void {    
    this.scene.start(MainMenuScene.KEY);
  }
}
