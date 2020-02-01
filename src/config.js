import { AUTO } from 'phaser';

export default {
  type: AUTO,
  parent: 'phaser-game',
  width: 338,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false,
      // debug: true,
    },
  },
};
