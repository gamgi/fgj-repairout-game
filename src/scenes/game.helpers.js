// import Phaser from 'phaser';

// class Brick extends Phaser.GameObjects.Sprite {
//   // constructor(...args) {
//   //   super(...args);
//   constructor(scene, x, y, texture) {
//     super(scene, x, y, texture);
//     scene.sys.displayList.add(this);
//     scene.sys.updateList.add(this);
//     scene.sys.arcadePhysics.world.enableBody(this, 0);
//     this._isHit = false;
//   }

//   hit() {
//     this._isHit = true;
//   }

//   isHit() {
//     return this._isHit;
//   }
// }
function addBrick(group, x, y, type) {
  // const brick = new Brick(this, x * 50, y * 50, 'invisibleBrick')
  //   .setDisplaySize(48.2, 20)
  //   .setDisplaySize(48.2, 20)
  //   .setOrigin(0, 0);
  // group.add(brick);
  const brick = group
    .create(x * 50, y * 20)
    .setDisplaySize(48.2, 20)
    .setOrigin(0, 0);
  brick.body.immovable = true;
  brick.hit = false;
  brick.type = type;
  brick.body.friction = 0;
  brick.refreshBody();
  return brick;
}
export default {
  addBrick,
};
