import { _decorator, Component, Graphics, Label } from "cc";
import { Circle } from "../Circle";
import DrawMgr from "../DrawMgr";

const { ccclass, property } = _decorator;

@ccclass('CircleItem')
export default class CircleItem extends Component {

    @property({ type: Graphics, visible: true })
    _graphics: Graphics = null;

    @property({ type: Label, visible: true })
    _lbId: Label = null;

    _circle: Circle = null;

    start() {
        this._graphics = this.getComponent(Graphics);
    }

    setCircle(circle: Circle) {
        if (!circle) {
            console.error("CircleItem setCircle error: circle is null");
            return;
        }

        this._lbId.string = circle.circleId.toString();

        this._circle = new Circle();
        this._circle.position = this.node.position.toVec2();
        this._circle.radius = circle.radius / 10;
        this._circle.rotateSpeed = circle.rotateSpeed;
        this._circle.circleId = circle.circleId;
        this._circle.graphics = this._graphics;
    }

    update(dt: number) {
        if (!this._circle) return;

        this._circle.draw(dt);
    }

    onBtnRemove() {
        if (!this._circle) return;

    }

    onBtnEdit() {
        if (!this._circle) return;

    }

}