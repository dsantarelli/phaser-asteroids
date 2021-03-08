export interface PlayerData {    
    readonly highestScore: number;
    readonly lives: number;
    saveScore(score: number): void;
    restoreLives(): void;
    loseLife(): void;
}