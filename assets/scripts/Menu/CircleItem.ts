import { _decorator, Component, Graphics, Label, tween, Tween } from "cc";
import { Circle } from "../Circle";
import DrawMgr from "../DrawMgr";
import Config from "../Config";

const { ccclass, property } = _decorator;

@ccclass('CircleItem')
export default class CircleItem extends Component {

    @property({ type: Graphics, visible: true })
    _graphics: Graphics = null;

    @property({ type: Label, visible: true })
    _lbId: Label = null;

    _circle: Circle = null;
    _dt: number = 0;

    start() {
        this._graphics = this.getComponent(Graphics);
    }

    setCircle(circle: Circle) {
        if (!circle) {
            console.error("CircleItem setCircle error: circle is null");
            return;
        }

        this._lbId.string = "ID:" + circle.circleId.toString();

        this._circle = new Circle();
        this._circle.position = this.node.position.toVec2();
        this._circle.radius = circle.radius / 3;
        this._circle.rotateSpeed = circle.rotateSpeed;
        this._circle.circleId = circle.circleId;
        this._circle.graphics = this._graphics;
        this._dt = 0;
    }

    update(dt: number) {
        if (!this._circle) return;

        this._graphics.clear();
        this._dt += dt;
        this._circle.draw(this._dt);
    }

    onBtnRemove() {
        if (!this._circle) return;

        DrawMgr.Inst.removeCircle(this._circle.circleId);
    }

    onBtnEdit() {
        if (!this._circle) return;

    }

    onBtnLight() {
        this.startLight();
    }

    _twLight: Tween = null;
    startLight() {
        if (!this._circle) return;
        this.stopLight();

        const circle = DrawMgr.Inst.getCircle(this._circle.circleId);
        if (!circle) return;

        circle.lightColor = Config.Inst.circleLightColor;
        this._twLight = tween(self)
            .delay(1)
            .call(() => {
                circle.lightColor = null;
                this._twLight = null;
            })
            .start();
    }

    stopLight() {
        if (!this._twLight) return;

        this._twLight.stop();
        const circle = DrawMgr.Inst.getCircle(this._circle.circleId);
        if (circle) {
            circle.lightColor = null;
        }
    }

}