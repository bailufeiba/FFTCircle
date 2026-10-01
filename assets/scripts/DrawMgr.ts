import { color, Color, Graphics, v2, Vec2 } from "cc";
import Config from "./Config";
import { Singleton } from "./Common/Singleton";
import { Circle } from "./Circle";

export default class DrawMgr extends Singleton<DrawMgr>() {
    _circleGraphics: Graphics = null;
    _arrCircle: Circle[] = [];

    _dt: number = 0;
    _timerId: number = 0;
    _drawInterval: number = 16; // 绘制间隔，单位毫秒

    _trajectoryGraphics: Graphics = null; // 轨迹画笔
    _trajectoryPrePos: Vec2 = v2(0, 0); // 轨迹上一次绘制的点
    _trajectoryCurrPos: Vec2 = v2(0, 0); // 轨迹当前绘制的点


    constructor() {
        super();
    }

    get dt() {
        return this._dt;
    }

    get circleGraphics() {
        return this._circleGraphics;
    }

    set circleGraphics(graphics: Graphics) {
        this._circleGraphics = graphics;
    }

    get drawInterval() {
        return this._drawInterval;
    }

    set drawInterval(interval: number) {
        this._drawInterval = interval;
    }

    set trajectoryGraphics(graphics: Graphics) {
        this._trajectoryGraphics = graphics;
    }

    _circleId: number = 0;
    createCircle(radius: number, rotateSpeed: number): Circle {
        const circle: Circle = new Circle();
        circle.graphics = this._circleGraphics;
        circle.radius = radius;
        circle.rotateSpeed = rotateSpeed;
        circle.circleId = ++this._circleId;
        return circle;
    }

    addCircle(circle: Circle) {
        if (this.hasCircle(circle.circleId)) return;
        this._arrCircle.push(circle);
    }

    getCircle(id: number): Circle {
        return this._arrCircle.find((circle) => {
            return circle.circleId === id;
        });
    }

    hasCircle(circleId: number): boolean {
        return this._arrCircle.some((circle) => {
            return circle.circleId === circleId;
        });
    }

    startDraw() {
        this.stopDraw();

        this._dt = 0;

        this._circleGraphics.clear();
        this._trajectoryGraphics.clear();

        this.drawCircle();
        this._trajectoryPrePos = v2(this._trajectoryCurrPos.x, this._trajectoryCurrPos.y);
        this._trajectoryGraphics.moveTo(this._trajectoryPrePos.x, this._trajectoryPrePos.y);

        this._timerId = setInterval(() => {
            this.draw();
            this._dt += this._drawInterval / 1000;
        }, this._drawInterval);
    }

    stopDraw() {
        if (this._timerId != 0) {
            clearInterval(this._timerId);
            this._timerId = 0;
        }
    }

    drawCircle() {
        let pos: Vec2 = v2(0, 0);
        this._circleGraphics.clear();
        this._circleGraphics.moveTo(pos.x, pos.y);
        this._arrCircle.forEach((circle) => {
            circle.position = pos;
            pos = circle.draw(this._dt);
        });

        this._trajectoryCurrPos = pos;
    }

    drawTrajectory() {
        this._trajectoryGraphics.lineWidth = Config.Inst.trajectoryLineWidth;
        this._trajectoryGraphics.strokeColor = Config.Inst.trajectoryColor;
        this._trajectoryGraphics.moveTo(this._trajectoryPrePos.x, this._trajectoryPrePos.y);
        this._trajectoryGraphics.lineTo(this._trajectoryCurrPos.x, this._trajectoryCurrPos.y);
        this._trajectoryGraphics.stroke();
        this._trajectoryPrePos = v2(this._trajectoryCurrPos.x, this._trajectoryCurrPos.y);
    }

    draw(): void {
        this.drawCircle();
        this.drawTrajectory();
    }

}