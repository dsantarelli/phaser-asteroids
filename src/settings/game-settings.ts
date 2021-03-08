import { AsteroidSize } from "../graphics/asteroid-size";

export interface ShipSettings {
    readonly size: number;
    readonly rotationAngleOffset: number;
    readonly decelerationScale: number;
    readonly boostScale: number;
    readonly recoilScale: number;
}

export interface AsteroidTypeSettings {
    readonly maxSize: number;
    readonly minSize: number;
    readonly maxSpeed: number;
    readonly minSpeed: number;
}

export interface AsteroidsSettings {    
    readonly initialCount: number;
    readonly fragmentsCount: number;
    readonly numberOfSides: number;
    readonly rotationAngleOffset: number;
    readonly large: AsteroidTypeSettings;
    readonly medium: AsteroidTypeSettings;
    readonly small: AsteroidTypeSettings;
    getTypeBySize(size: AsteroidSize): AsteroidTypeSettings;
    getScoreBySize(size: AsteroidSize): number;
}

export interface BulletsSettings {
    readonly lifeSpan: number;
    readonly radius: number;
    readonly velocityFactor: number;
}

export interface GameSettings {
    readonly ship: ShipSettings;
    readonly asteroids: AsteroidsSettings;
    readonly bullets: BulletsSettings;
}