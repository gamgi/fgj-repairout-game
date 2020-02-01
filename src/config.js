import { AUTO } from 'phaser';

export default {
  type: AUTO,
  parent: 'phaser-game',
  width: 338,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 },
      debug: true,
    },
  },
};
