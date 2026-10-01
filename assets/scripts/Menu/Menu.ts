import { _decorator, Component, Graphics, instantiate, Label, Prefab, ScrollView } from "cc";
import DrawMgr from "../DrawMgr";
import CircleItem from "./CircleItem";
import { offEvent, onEvent } from "../Common/EventManager";

const { ccclass, property } = _decorator;

@ccclass('Menu')
export default class Menu extends Component {

    @property({ type: ScrollView, visible: true })
    _circleList: ScrollView = null;

    @property({ type: Prefab, visible: true })
    _circlePfb: Prefab = null;

    protected start(): void {
        onEvent("Circle_Removed", this, this.initCircleList);
    }

    initCircleList() {
        const allCircle = DrawMgr.Inst.getAllCircle();

        this._circleList.content.removeAllChildren();
        allCircle.forEach((circle) => {
            const node = instantiate(this._circlePfb);
            this._circleList.content.addChild(node);

            const item: CircleItem = node.getComponent(CircleItem);
            item.setCircle(circle);
        });

    }

    protected onDestroy(): void {
        offEvent(this);
    }

}