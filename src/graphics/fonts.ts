class Font {

    constructor(
        private name: string,
        private textureURL: string,
        private fontDataURL: string) {
    }

    loadOn(scene: Phaser.Scene): void {
        scene.load.bitmapFont(this.name, this.textureURL, this.fontDataURL);
    }

    addBitmapTextOn(scene: Phaser.Scene, x: number, y: number, text?: string | string[], size?: number, align?: number): Phaser.GameObjects.BitmapText {
        return scene.add.bitmapText(x, y, this.name, text, size, align)
    }
}

export class Fonts {
    public static readonly ARCADE_CLASSIC = new Font(
        'arcadeClassic', 
        './assets/font/arcadeClassic.png', 
        './assets/font/arcadeClassic.fnt');

    public static readonly ALTERNITY = new Font(
        'alternity',
        './assets/font/alternity.png',
        './assets/font/alternity.fnt');
}