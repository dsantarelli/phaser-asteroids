import { Game } from "../game";

export interface GameFactory {
    create(): Game
}