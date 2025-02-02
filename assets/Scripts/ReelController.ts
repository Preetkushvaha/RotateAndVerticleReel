// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { IReelItem } from "./Interfaces";
import Item from "./Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ReelController extends cc.Component {
  @property(cc.Prefab)
  reelItemPrefab: cc.Prefab = null;

  @property(cc.Slider)
  speedSlider: cc.Slider = null;

  initialItems: number = 20;
  intervalID: any = null;
  itemInterval: number = 200;
  currentItemNumbers = 0;
  isSpinning: boolean = false;

  // LIFE-CYCLE CALLBACKS:]
  colorArray: cc.Color[] = [
    cc.Color.BLUE,
    cc.Color.RED,
    cc.Color.CYAN,
    cc.Color.ORANGE,
    cc.Color.GREEN,
    cc.Color.GRAY,
    cc.Color.MAGENTA,
    cc.Color.YELLOW,
  ];
  start() {
    this.initReel();
    this.speedSlider.progress = 0;
  }
  //****init reel */
  initReel() {
    this.node.removeAllChildren();
    this.node.getComponent(cc.Layout).updateLayout();
    for (let i = 0; i < this.initialItems; i++) {
      let newItem = cc.instantiate(this.reelItemPrefab);
      this.node.addChild(newItem);
      this.currentItemNumbers++;
      let colorIndex = Math.floor(Math.random() * this.colorArray.length);
      let itemData: IReelItem = {
        itemCount: this.currentItemNumbers,
        spriteColor: this.colorArray[colorIndex],
      };
      newItem.getComponent(Item).setData(itemData);
      newItem.setSiblingIndex(0);
      console.log("adding item");
    }
  }
  updateFrequency() {
    console.log("slider update");
    this.itemInterval = 200 + this.speedSlider.progress * 1000;
    this.startAndStopSpinning();
    this.startAndStopSpinning();
  }

  //********Add item in reel */
  addItem() {
    let newItem = cc.instantiate(this.reelItemPrefab);
    this.node.addChild(newItem);
    let colorIndex = Math.floor(Math.random() * this.colorArray.length);
    this.currentItemNumbers++;
    let itemData: IReelItem = {
      itemCount: this.currentItemNumbers,
      spriteColor: this.colorArray[colorIndex],
    };
    newItem.getComponent(Item).setData(itemData);
    newItem.setSiblingIndex(0);
    this.node.children.forEach((child, index) => {
      cc.tween(child)
        .to(0.1, { y: -index * child.height })
        .start();
    });
  }
  //********Start and stop spinning */
  startAndStopSpinning() {
    this.isSpinning = !this.isSpinning;
    if (!this.isSpinning) {
      if (this.intervalID) {
        clearInterval(this.intervalID);
        this.intervalID = null;
      }
    } else {
      this.intervalID = setInterval(() => {
        this.removeItem();
        this.scheduleOnce(() => this.addItem(), this.itemInterval / 2000);
      }, this.itemInterval);
    }
  }
  //****Remove item  */
  removeItem() {
    if (this.node.childrenCount > 0) {
      let lastItem = this.node.children[this.node.childrenCount - 1];
      lastItem.destroy();
    }
  }
}
