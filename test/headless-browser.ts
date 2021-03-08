import { Game } from "../src/game";
import { HeadlessBrowserGameFactory } from "../src/browser/headless-browser-game-factory";

export class HeadlessBrowser {

    private static readonly TIMEOUT_MS = 500;

    public static async onGameStarted(onStarted: (game: Game) => void): Promise<void> {
        await HeadlessBrowser.timeout(HeadlessBrowser.TIMEOUT_MS);
        const game = new HeadlessBrowserGameFactory().create();
        await HeadlessBrowser.timeout(HeadlessBrowser.TIMEOUT_MS);
        game.start();
        await HeadlessBrowser.timeout(HeadlessBrowser.TIMEOUT_MS);
        onStarted(game);
        game.destroy(true);
    }

    private static timeout(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}