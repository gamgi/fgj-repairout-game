import Phaser from 'phaser';
import backgroundImg from './assets/sky.png';
import paddleImg from './assets/paddle.png';
import ballImg from './assets/ball.png';

let cursors;
let paddle;
let ball;
let scoreText;

let game;

class Helpers {
  static hitBall(_ball, _paddle) {
    const ballPos = new Phaser.Math.Vector2(_ball.x, _ball.y);
    const paddlePos = new Phaser.Math.Vector2(_paddle.x, _paddle.y);

    const newVelocity = ballPos
      .subtract(paddlePos)
      .normalize()
      .scale(100);

    _ball.setVelocity(newVelocity.x, newVelocity.y);
  }
}

function preload() {
  this.load.image('background', backgroundImg);
  this.load.image('paddle', paddleImg);
  this.load.image('ball', ballImg);
}

function create() {
  this.add.image(400, 300, 'background');

  // paddle
  paddle = this.physics.add.sprite(game.config.width / 2, 580, 'paddle');
  paddle.setDisplaySize(120, 40);
  paddle.setImmovable();
  paddle.setCollideWorldBounds(true);

  // Ball
  ball = this.physics.add.sprite(game.config.width / 2, 300, 'ball');
  ball.setScale(0.1, 0.1);
  ball.setCircle(200);
  ball.setBounce(0.8);
  ball.setVelocity(0, 100);
  ball.setCollideWorldBounds(true);

  this.physics.add.collider(ball, paddle, Helpers.hitBall, null, this);

  // Input
  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, '', {
    fontSize: '32px',
    fill: '#000',
  });
}

function update() {
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

const config = {
  type: Phaser.AUTO,
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
  scene: {
    preload,
    create,
    update,
  },
};

game = new Phaser.Game(config);
