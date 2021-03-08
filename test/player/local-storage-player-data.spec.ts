import { assert } from "chai";
import { LocalStoragePlayerData } from "../../src/player/local-storage-player-data";

describe('LocalStorage player data', () => {

   const createPlayerData = () => new LocalStoragePlayerData(3, Math.random().toString(36).substring(8));

   it('is initialized', () => {
      const sut = createPlayerData();
      assert.equal(sut.lives, 3);
      assert.equal(sut.highestScore, 0);
   });

   it('saves highest score', () => {
      const sut = createPlayerData();

      sut.saveScore(100);
      assert.equal(sut.highestScore, 100);      

      sut.saveScore(300);
      assert.equal(sut.highestScore, 300);      

      sut.saveScore(100);
      assert.equal(sut.highestScore, 300);      
   });

   it('handles the loss of lives', () => {
      const sut = createPlayerData();
      assert.equal(sut.lives, 3);

      sut.loseLife(); assert.equal(sut.lives, 2);
      sut.loseLife(); assert.equal(sut.lives, 1);
      sut.loseLife(); assert.equal(sut.lives, 0);
      sut.loseLife(); assert.equal(sut.lives, 0);
   });

   it('restores lives', () => {
      const sut = createPlayerData();
      assert.equal(sut.lives, 3);

      sut.loseLife(); 
      assert.equal(sut.lives, 2);

      sut.restoreLives()      
      assert.equal(sut.lives, 3);
   });

   it('restores lives keeping the highest score', () => {
      const sut = createPlayerData();
      assert.equal(sut.lives, 3);
      assert.equal(sut.highestScore, 0);

      sut.saveScore(300);
      assert.equal(sut.highestScore, 300);

      sut.loseLife(); 
      assert.equal(sut.lives, 2);
      assert.equal(sut.highestScore, 300);

      sut.restoreLives()      
      assert.equal(sut.lives, 3);
      assert.equal(sut.highestScore, 300);
   });
});