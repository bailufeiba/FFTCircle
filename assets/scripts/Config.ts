import { Singleton } from "./Common/Singleton";
import { Color, color } from "cc";

export default class Config extends Singleton<Config>() {

    _circleColor: Color = color(255, 255, 255, 255); // 圆圈颜色
    get circleColor(): Color {
        return this._circleColor;
    }
    set circleColor(color: Color) {
        this._circleColor = color;
    }

    _circleLineWidth: number = 2; // 圆圈线宽
    get circleLineWidth(): number {
        return this._circleLineWidth;
    }
    set circleLineWidth(width: number) {
        this._circleLineWidth = width;
    }

    _circleRadiusColor: Color = color(0, 0, 255, 255); // 圆圈半径线颜色
    get circleRadiusColor(): Color {
        return this._circleRadiusColor;
    }
    set circleRadiusColor(color: Color) {
        this._circleRadiusColor = color;
    }

    _circleRadiusLineWidth: number = 4; // 圆圈半径线宽
    get circleRadiusLineWidth(): number {
        return this._circleRadiusLineWidth;
    }
    set circleRadiusLineWidth(width: number) {
        this._circleRadiusLineWidth = width;
    }

    _trajectoryColor: Color = color(255, 0, 0, 255); // 轨迹颜色
    get trajectoryColor(): Color {
        return this._trajectoryColor;
    }
    set trajectoryColor(color: Color) {
        this._trajectoryColor = color;
    }

    _trajectoryLineWidth: number = 2; // 轨迹线宽
    get trajectoryLineWidth(): number {
        return this._trajectoryLineWidth;
    }
    set trajectoryLineWidth(width: number) {
        this._trajectoryLineWidth = width;
    }

}