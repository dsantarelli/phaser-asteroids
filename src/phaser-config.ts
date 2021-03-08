import 'phaser';
import { BootScene } from './scenes/boot-scene';
import { MainMenuScene } from './scenes/main-menu-scene';
import { GameScene } from './scenes/game-scene';

export class AsteroidPhaserConfig {
  
  public static forBrowser(domElementId?: string): Phaser.Types.Core.GameConfig {
    return {
      title: 'Asteroid',
      version: '1.0.0',
      width: 800,
      height: 600,
      type: Phaser.AUTO,
      parent: domElementId,
      scene: [BootScene, MainMenuScene, GameScene],
      input: {
        keyboard: true,
        mouse: false,
        touch: false,
        gamepad: false
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      backgroundColor: '#000000',
      render: { pixelArt: false, antialias: true }      
    }
  };

  public static forHeadlessBrowser(): Phaser.Types.Core.GameConfig {
    const config = AsteroidPhaserConfig.forBrowser();
    config.type = Phaser.HEADLESS;
    delete config.parent;
    return config;
  }
}
