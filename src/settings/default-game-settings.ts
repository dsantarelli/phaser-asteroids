import { AsteroidSize } from "../graphics/asteroid-size";
import { GameSettings, AsteroidsSettings, ShipSettings, AsteroidTypeSettings, BulletsSettings } from "./game-settings";

export class DefaultGameSettings implements GameSettings {

    readonly ship: ShipSettings;
    readonly asteroids: AsteroidsSettings;
    readonly bullets: BulletsSettings;

    constructor() {
        
        this.ship = {
            size: 20,
            rotationAngleOffset: 0.08,
            decelerationScale: 0.98,
            boostScale: 0.12,
            recoilScale: 0.2
        };

        this.bullets = {
            lifeSpan: 100,
            radius: 3,
            velocityFactor: 15
        };

        const asteroidSettings = {
            initialCount: 3,
            fragmentsCount: 3,
            numberOfSides: 12,
            rotationAngleOffset: 0.005,
            large: {
                maxSize: 100,
                minSize: 50,
                maxSpeed: 3,
                minSpeed: 1
            },
            medium: {
                maxSize: 50,
                minSize: 30,
                maxSpeed: 3,
                minSpeed: 1
            },
            small: {
                maxSize: 30,
                minSize: 10,
                maxSpeed: 3,
                minSpeed: 2
            }
        };

        (asteroidSettings as any).getTypeBySize = (size: AsteroidSize): AsteroidTypeSettings => {
            switch (size) {
                case AsteroidSize.LARGE : return asteroidSettings.large;
                case AsteroidSize.MEDIUM: return asteroidSettings.medium;
                case AsteroidSize.SMALL : return asteroidSettings.small;
                default: throw new Error('Unsupported size: ' + size);
            }
        } 

        (asteroidSettings as any).getScoreBySize = (size: AsteroidSize): number => {
            switch (size) {
                case AsteroidSize.LARGE : return 20;
                case AsteroidSize.MEDIUM: return 50;
                case AsteroidSize.SMALL : return 100;
                default: throw new Error('Unsupported size: ' + size);
              }
        } 

        this.asteroids = asteroidSettings as AsteroidsSettings;
    }
}