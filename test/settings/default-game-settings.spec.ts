import { assert } from "chai";
import { AsteroidSize } from "../../src/graphics/asteroid-size";
import { DefaultGameSettings } from "../../src/settings/default-game-settings";

describe('Default game settings', () => {

    const sut = new DefaultGameSettings();

    const assertIsDefinedAndNotNull = (obj: any): void => {
        assert.isDefined(obj);
        assert.isNotNull(obj);
    };

    it('are initialized', () => {
        assertIsDefinedAndNotNull(sut.ship);
        assertIsDefinedAndNotNull(sut.bullets);
        assertIsDefinedAndNotNull(sut.asteroids);
        assertIsDefinedAndNotNull(sut.asteroids.large);
        assertIsDefinedAndNotNull(sut.asteroids.medium);
        assertIsDefinedAndNotNull(sut.asteroids.small);
        assertIsDefinedAndNotNull(sut.asteroids.getScoreBySize);
        assertIsDefinedAndNotNull(sut.asteroids.getTypeBySize);
    });

    it('calculates score by size', () => {
        assert.isNumber(sut.asteroids.getScoreBySize(AsteroidSize.SMALL));
        assert.isNumber(sut.asteroids.getScoreBySize(AsteroidSize.MEDIUM));
        assert.isNumber(sut.asteroids.getScoreBySize(AsteroidSize.LARGE));
    });

    it('doesnt calculates score for unknown size', () => {
        assert.throws(() => (sut.asteroids as any).getScoreBySize(9999));
    });

    it('gets type by size', () => {
        assertIsDefinedAndNotNull(sut.asteroids.getTypeBySize(AsteroidSize.SMALL));
        assertIsDefinedAndNotNull(sut.asteroids.getTypeBySize(AsteroidSize.MEDIUM));
        assertIsDefinedAndNotNull(sut.asteroids.getTypeBySize(AsteroidSize.LARGE));
    });

    it('doesnt get type by unknown size', () => {
        assert.throws(() => (sut.asteroids as any).getTypeBySize(9999));
    });
});
