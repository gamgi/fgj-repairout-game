import Phaser, { Scene } from 'phaser';
import config from '../config';

import backgroundImg from '../assets/sky.png';
import brickImg from '../assets/brick.png';
import invisibleBrickImg from '../assets/invisible.png';
import paddleImg from '../assets/paddle.png';
import ballImg from '../assets/ball.png';
import levels from '../levels';
import Helpers from './game.helpers';

function hitBrick(ball, brick) {
  if (
    ball.body.y > brick.body.y - brick.displayHeight &&
    ball.body.velocity.y > 0 &&
    brick.hit === false
  ) {
    // clear collision (naive)
    ball.setY(brick.body.y - brick.displayHeight / 2 - ball.displayHeight / 2);
    brick.setTexture('brick');

    // enable collision
    this.physics.add.collider(ball, brick);
    brick.hit = true;
  }
}

function hitBall(ball, paddle) {
  const ballPos = new Phaser.Math.Vector2(ball.x, ball.y);
  const paddlePos = new Phaser.Math.Vector2(paddle.x, paddle.y);

  const newVelocity = ballPos
    .subtract(paddlePos)
    .normalize()
    .scale(300);

  ball.setVelocity(newVelocity.x, newVelocity.y);
}

export default class GameScene extends Scene {
  constructor() {
    super({ key: 'game' });
    this.score = 0;
  }

  preload() {
    this.load.image('background', backgroundImg);
    this.load.image('brick', brickImg);
    this.load.image('invisibleBrick', invisibleBrickImg);
    this.load.image('paddle', paddleImg);
    this.load.image('ball', ballImg);
  }

  create() {
    this.add.image(400, 300, 'background');

    // level
    this.physics.world.setBoundsCollision(true, true, true, false);
    const bricks = this.physics.add.staticGroup({
      defaultKey: 'invisibleBrick',
    });
    levels[0].bricks.forEach(b => Helpers.addBrick.apply(this, [bricks, ...b]));

    // paddle
    this.paddle = this.physics.add.sprite(config.width / 2 + 12, 580, 'paddle');
    this.paddle
      .setDisplaySize(120, 20)
      .setImmovable()
      .setCollideWorldBounds(true);

    // Ball
    const ball = this.physics.add.sprite(config.width / 2, 400, 'ball');
    ball.setDisplaySize(20, 20);
    ball.setBounce(1);
    ball.setVelocity(0, 300);
    ball.setCollideWorldBounds(true);
    const updateScoreAndCollide = (...args) => {
      hitBall(...args);
      this.score += 1;
    };
    this.physics.add.collider(
      ball,
      this.paddle,
      updateScoreAndCollide,
      null,
      this,
    );
    this.physics.add.overlap(ball, bricks, hitBrick, null, this);

    // input
    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreText = this.add.text(2, 2, '', {
      fontSize: '16px',
      fill: '#000',
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(160);
    } else {
      this.paddle.setVelocityX(0);
    }

    // score
    this.scoreText.setText(`score: ${this.score}`);
  }
}
