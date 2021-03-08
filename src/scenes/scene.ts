import { Game } from "../game";
import { PlayerData } from "../player/player-data";
import { GameSettings } from "../settings/game-settings";


export abstract class Scene extends Phaser.Scene {

    get settings(): GameSettings {
        return (this.game as Game).gameSettings;
    }

    get playerData(): PlayerData {
        return (this.game as Game).playerData;
    }

    protected constructor(key: string) {
        super({ key: key });
    }
}
