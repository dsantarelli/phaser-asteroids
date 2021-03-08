import { Game } from "../game";
import { AsteroidPhaserConfig } from "../phaser-config";
import { DefaultLocalStoragePlayerData } from "../player/local-storage-player-data";
import { DefaultGameSettings } from "../settings/default-game-settings";
import { GameFactory } from "./game-factory";

export class HeadlessBrowserGameFactory implements GameFactory {
    
    create(): Game {
        return new Game(
            AsteroidPhaserConfig.forHeadlessBrowser(),
            new DefaultGameSettings(),
            new DefaultLocalStoragePlayerData());
    }
}