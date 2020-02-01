import { Scene } from 'phaser';
import config from '../config';

import backgroundImg from '../assets/sky.png';
import brickImg from '../assets/brick.png';
import paddleImg from '../assets/paddle.png';
import ballImg from '../assets/ball.png';
import levels from '../levels';
import Helpers from './game.helpers';

let bricks;
let cursors;
let paddle;
let ball;
let scoreText;

export default class GameScene extends Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('background', backgroundImg);
    this.load.image('brick', brickImg);
    this.load.image('paddle', paddleImg);
    this.load.image('ball', ballImg);
  }

  create() {
    this.add.image(400, 300, 'background');
    // level
    bricks = this.physics.add.staticGroup({ defaultKey: 'brick' });
    levels[0].bricks.forEach(b => {
      const [x, y, type] = b;
      bricks
        .create(x * 50, y * 20)
        .setDisplaySize(50, 20)
        .setOrigin(0, 0)
        .refreshBody();
    });

    // paddle
    paddle = this.physics.add.sprite(config.width / 2, 580, 'paddle');
    paddle.setDisplaySize(120, 40);
    paddle.setImmovable();
    paddle.setCollideWorldBounds(true);

    // Ball
    ball = this.physics.add.sprite(config.width / 2, 300, 'ball');
    ball.setScale(0.1, 0.1);
    ball.setCircle(200);
    ball.setBounce(0.8);
    ball.setVelocity(0, 100);
    ball.setCollideWorldBounds(true);

    this.physics.add.collider(ball, paddle, Helpers.hitBall, null, this);
    this.physics.add.collider(ball, bricks, Helpers.hitBrick, null, this);

    // Input
    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, '', {
      fontSize: '32px',
      fill: '#000',
    });
  }

  update() {
    // paddle input
    if (cursors.left.isDown) {
      paddle.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      paddle.setVelocityX(160);
    } else {
      paddle.setVelocityX(0);
    }
    if (cursors.up.isDown && paddle.body.touching.down) {
      paddle.setVelocityY(-330);
    }
    // score
    scoreText.setText(`score: ${0}`);
  }
}