import { AsteroidPhaserConfig } from "../phaser-config";
import { DefaultLocalStoragePlayerData } from "../player/local-storage-player-data";
import { Game } from "../game";
import { DefaultGameSettings } from "../settings/default-game-settings";
import { GameFactory } from "./game-factory";

export class BrowserGameFactory implements GameFactory {

    constructor(private domElementId: string) { }

    create(): Game {
        return new Game(
            AsteroidPhaserConfig.forBrowser(this.domElementId),
            new DefaultGameSettings(),
            new DefaultLocalStoragePlayerData());
    }
}