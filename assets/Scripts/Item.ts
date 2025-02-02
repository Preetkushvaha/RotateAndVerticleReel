import { IReelItem } from "./Interfaces";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {
  @property({ type: cc.Label })
  itemLabel: cc.Label = null;
  @property({ type: cc.Sprite })
  itemSprite: cc.Sprite = null;

  setData(data: IReelItem) {
    this.itemLabel.string = data.itemCount.toString();
    this.itemSprite.node.color = data.spriteColor;
  }
}
