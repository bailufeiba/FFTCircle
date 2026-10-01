import { _decorator, Component, Graphics, Node, Color, color, game, view, UITransform, EventTouch, Vec2, v2, clamp } from 'cc';
import DrawMgr from './DrawMgr';
import Config from './Config';
import I18Mgr from './i18/I18Mgr';
import Menu from './Menu/Menu';
import { offEvent, onEvent } from './Common/EventManager';
const { ccclass, property } = _decorator;

@ccclass('StartScene')
export class StartScene extends Component {

    @property({ type: Node, visible: true })
    _drawNode: Node = null;

    @property({ type: Graphics, visible: true })
    _circleGraphics: Graphics = null;

    @property({ type: Graphics, visible: true })
    _trajectoryGraphics: Graphics = null;

    @property({ type: Menu, visible: true })
    _menu: Menu = null;

    _drawMgr: DrawMgr = null;
    start() {
        game.frameRate = 120;
        I18Mgr.Inst.initDefaultLanguage();

        Config.Inst.trajectoryColor = color(255, 107, 235, 255);
        Config.Inst.trajectoryLineWidth = 5;
        Config.Inst.circleLineWidth = 2;
        Config.Inst.circleRadiusLineWidth = 3;

        this._drawMgr = DrawMgr.Inst;
        this._drawMgr.circleGraphics = this._circleGraphics;
        this._drawMgr.trajectoryGraphics = this._trajectoryGraphics;
        const kunCircleParams: Array<[number, number]> = [
            [130, 60],
            [96, -120],
            [74, 180],
            [58, -240],
            [46, 300],
            [38, -360],
            [31, 420],
            [26, -480],
            [22, 540],
            [19, -600],
            [16, 660],
            [14, -720],
            [12, 780],
            [10, -840],
            [9, 900],
            [8, -960],
            [7, 1020],
            [6, -1080],
            [5, 1140],
            [4, -1200],
            [3, 1260],
        ];
        kunCircleParams.forEach(([radius, rotateSpeed]) => {
            this._drawMgr.addCircle(this._drawMgr.createCircle(radius, rotateSpeed));
        });

        this.autoDrawSize();
        this.autoScaleDraw();
        this._drawMgr.startDraw();

        this._menu.initCircleList();

        this.node.on(Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    _bTouchBegin: boolean = false;
    onTouchBegin(event: EventTouch) {
        this._bTouchBegin = true;
    }

    onTouchMove(event: EventTouch) {
        if (!this._bTouchBegin) return;

        const uiTrans = this._drawNode.getComponent(UITransform);
        if (!uiTrans) return;

        const moveDelta: Vec2 = event.getDelta();
        const drawSize = uiTrans.contentSize;
        const drawScale = v2(this._drawNode.scale.x, this._drawNode.scale.y);
        const viewSize = view.getVisibleSize();

        const curPos = this._drawNode.position;
        const nextX = curPos.x + moveDelta.x;
        const nextY = curPos.y + moveDelta.y;

        const scaledWidth = drawSize.width * Math.abs(drawScale.x);
        const scaledHeight = drawSize.height * Math.abs(drawScale.y);

        const xOffset = Math.max(0, (scaledWidth + 50 - viewSize.width) * 0.5);
        const yOffset = Math.max(0, (scaledHeight + 50 - viewSize.height) * 0.5);

        const clampedX = clamp(nextX, -xOffset, xOffset);
        const clampedY = clamp(nextY, -yOffset, yOffset);

        this._drawNode.setPosition(clampedX, clampedY, curPos.z);
    }

    onTouchEnd(event: EventTouch) {
        if (!this._bTouchBegin) return;
        this._bTouchBegin = false;

    }

    autoDrawSize() {
        const totalDiameter = this._drawMgr.getTotalDiameter();
        const uiTrans = this._drawNode.getComponent(UITransform);
        if (uiTrans) {
            uiTrans.setContentSize(totalDiameter, totalDiameter);
        }
    }

    autoScaleDraw() {
        const totalDiameter = this._drawMgr.getTotalDiameter();
        const drawNodeSize = view.getVisibleSize();
        const scale = Math.min(drawNodeSize.width / totalDiameter, drawNodeSize.height / totalDiameter);
        this._drawNode.setScale(scale, scale, 1);
    }

    protected onDestroy(): void {
        offEvent(this);
    }
}


