import 'phaser';
import { GameSettings } from './settings/game-settings';
import { PlayerData } from './player/player-data';

export class Game extends Phaser.Game {

  public readonly gameSettings: GameSettings;
  public readonly playerData: PlayerData;

  constructor(
    phaserConfig: Phaser.Types.Core.GameConfig,
    gameSettings: GameSettings,
    playerData: PlayerData
  ) {
    super(phaserConfig);
    this.gameSettings = gameSettings;
    this.playerData = playerData;
  }

  public start(): void {
    super.start();
  }
}
