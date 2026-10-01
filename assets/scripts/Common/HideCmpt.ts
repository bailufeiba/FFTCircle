import { _decorator, Component } from "cc";

const { ccclass } = _decorator;

@ccclass('HideCmpt')
export default class HideCmpt extends Component {

    protected onLoad(): void {
        this.node.destroy();
    }

}