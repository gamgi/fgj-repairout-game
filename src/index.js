import { Game } from 'phaser';
import baseConfig from './config';
import GameScene from './scenes/game';

const config = {
  ...baseConfig,
  scene: GameScene,
};

// eslint-disable-next-line no-unused-vars
const game = new Game(config);
