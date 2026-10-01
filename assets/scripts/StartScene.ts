import { _decorator, Component, Graphics, Node, Color, color } from 'cc';
import DrawMgr from './DrawMgr';
import I18Mgr from './i18/I18Mgr';
const { ccclass, property } = _decorator;

@ccclass('StartScene')
export class StartScene extends Component {

    @property({ type: Graphics, visible: true })
    _circleGraphics: Graphics = null;

    @property({ type: Graphics, visible: true })
    _trajectoryGraphics: Graphics = null;

    _drawMgr: DrawMgr = null;
    start() {

        I18Mgr.Inst.initDefaultLanguage();

        this._circleGraphics.lineWidth = 2;
        this._circleGraphics.strokeColor = color(255, 255, 255, 255);

        this._trajectoryGraphics.lineWidth = 2;
        this._trajectoryGraphics.strokeColor = color(255, 0, 0, 255);

        this._drawMgr = DrawMgr.Inst;
        this._drawMgr.circleGraphics = this._circleGraphics;
        this._drawMgr.trajectoryGraphics = this._trajectoryGraphics;
        this._drawMgr.addCircle(this._drawMgr.createCircle(100, 120));
        this._drawMgr.addCircle(this._drawMgr.createCircle(100, 240));
        this._drawMgr.addCircle(this._drawMgr.createCircle(100, 360));
        this._drawMgr.startDraw();
    }

    update(deltaTime: number) {

    }
}


