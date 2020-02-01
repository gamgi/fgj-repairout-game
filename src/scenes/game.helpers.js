
import Phaser from 'phaser';

export default class Helpers {
  static hitBall(_ball, _paddle) {
    const ballPos = new Phaser.Math.Vector2(_ball.x, _ball.y);
    const paddlePos = new Phaser.Math.Vector2(_paddle.x, _paddle.y);

    const newVelocity = ballPos
      .subtract(paddlePos)
      .normalize()
      .scale(100);

    _ball.setVelocity(newVelocity.x, newVelocity.y);
  }

  static hitBrick(_ball, _brick) {
    // TODO
  }
}