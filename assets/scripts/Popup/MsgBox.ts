import { _decorator, Button, Component, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass('MsgBox')
export default class MsgBox extends Component {

    @property({ type: Label, visible: true })
    _lbTitle: Label = null;

    @property({ type: Label, visible: true })
    _lbMsg: Label = null;

    @property({ type: Button, visible: true })
    _btnOk: Button = null;

    @property({ type: Button, visible: true })
    _btnCancel: Button = null;

    showMsg(
        data: {
            title?: string,
            msg: string,
            okCallback?: () => void,
            cancelCallback?: () => void,
            showCancel?: boolean
        }
    ) {
        this._lbTitle.string = data.title || "提示";
        this._lbMsg.string = data.msg;

        this._btnCancel.node.active = data.showCancel === true;

        this._btnOk.node.off("click");
        this._btnCancel.node.off("click");

        if (data.okCallback) {
            this._btnOk.node.on("click", data.okCallback);
        }
        if (data.cancelCallback) {
            this._btnCancel.node.on("click", data.cancelCallback);
        }
    }

}