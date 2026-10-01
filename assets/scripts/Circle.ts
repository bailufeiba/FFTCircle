import { _decorator, Component, Graphics, Node, Color, color, Vec2, v2, v3, Vec3 } from 'cc';
import Config from './Config';
const { ccclass, property } = _decorator;

export class Circle {
    _circleID: number = 0;  //圆圈ID

    _graphics: Graphics = null; //画笔

    _position: Vec2 = v2(0, 0); //圆心位置
    _radius: number = 100;  //半径
    _rotateSpeed: number = 360; //旋转速度 1秒360度

    get circleId(): number {
        return this._circleID;
    }

    set circleId(id: number) {
        this._circleID = id;
    }

    set graphics(graphics: Graphics) {
        this._graphics = graphics;
    }

    set radius(r: number) {
        this._radius = r;
    }

    set position(pos: Vec2) {
        this._position = pos;
    }

    set rotateSpeed(speed: number) {
        this._rotateSpeed = speed;
    }

    draw(dt: number): Vec2 {
        this.drawCircle();

        const angle: number = this._rotateSpeed * dt % 360 / 180 * Math.PI;
        const pos: Vec2 = v2(this._position.x + this._radius * Math.cos(angle), this._position.y + this._radius * Math.sin(angle));
        this.drawRadius(pos);

        return pos;
    }

    drawCircle() {
        this._graphics.lineWidth = Config.Inst.circleLineWidth;
        this._graphics.strokeColor = Config.Inst.circleColor;
        this._graphics.moveTo(this._position.x, this._position.y);
        this._graphics.circle(this._position.x, this._position.y, this._radius);
        this._graphics.stroke();
    }

    drawRadius(endPos: Vec2) {
        this._graphics.lineWidth = Config.Inst.circleRadiusLineWidth;
        this._graphics.strokeColor = Config.Inst.circleRadiusColor;
        this._graphics.moveTo(this._position.x, this._position.y);
        this._graphics.lineTo(endPos.x, endPos.y);
        this._graphics.stroke();
    }
}


