export class MathUtils {

  public static getRandomVector2(min: number, max: number): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      Phaser.Math.RND.between(MathUtils.getRandomNumber(min, max), MathUtils.getRandomNumber(min, max)),
      Phaser.Math.RND.between(MathUtils.getRandomNumber(min, max), MathUtils.getRandomNumber(min, max))
    );
  }

  public static getRandomNumber(min: number, max: number): number {
    let num = Math.floor(Math.random() * max) + min;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return num;
  }
}