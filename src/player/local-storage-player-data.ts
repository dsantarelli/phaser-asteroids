import { PlayerData } from "./player-data";

export class LocalStoragePlayerData implements PlayerData {
    
    private _lives: number = 0;
    get lives(): number {
        return this._lives;
    }

    private _highestScore: number = null;
    get highestScore(): number {
        if (this._highestScore == null) {
            this._highestScore = this.loadHighestScoreFromLocalStorage();
        }
        return this._highestScore;
    }
    set highestScore (value: number) {
        this._highestScore = value;
        this.saveHighestScoreOnLocalStorage(value);
    }

    constructor(private initialLives: number, private highestScoreKey: string) {
        this._lives = initialLives;        
    }

    loseLife(): void {
        if (this.lives > 0) {
            --this._lives;
        }
    }

    saveScore(score: number): void {
        if (score > this.highestScore) {
            this.highestScore = score;            
        }
    }

    restoreLives(): void {
        this._lives = this.initialLives;
    }

    private loadHighestScoreFromLocalStorage(): number {
        const value = localStorage.getItem(this.highestScoreKey);
        return (value) ? parseInt(value) : 0;
    }

    private saveHighestScoreOnLocalStorage(value: number): void {
        localStorage.setItem(this.highestScoreKey, value.toString());
    }
}

export class DefaultLocalStoragePlayerData extends LocalStoragePlayerData {

    private static readonly DEFAULT_LIVES = 3;
    private static readonly HIGHEST_SCORE_KEY = 'ASTEROID_HIGHEST_SCORE_KEY';

    constructor() {
        super(DefaultLocalStoragePlayerData.DEFAULT_LIVES, 
              DefaultLocalStoragePlayerData.HIGHEST_SCORE_KEY);
    }
}