// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rotation extends cc.Component {
  @property(cc.Node)
  rotateNode: cc.Node = null;

  speed: number = 2;
  radius: number = 200;
  isRotating: boolean = false;
  angle: number = 0;

  onRotateClicked() {
    this.isRotating = !this.isRotating;
  }

  update(dt) {
    if (this.isRotating) {
      this.angle += this.speed * dt;
      //   console.log("angle : ", this.angle);
      const x = this.radius * Math.cos(this.angle);
      const y = this.radius * Math.sin(this.angle);
      //   console.log("x,y : ", x, y);
      this.rotateNode.setPosition(x, y);
    }
  }
}
