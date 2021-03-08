import { BrowserGameFactory } from "./browser/browser-game-factory";

window.addEventListener('load', () => {
    new BrowserGameFactory('game').create();    
});