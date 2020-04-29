import { _decorator, Component, Node } from "cc";
import { CustomEventListener } from "../data/CustomEventListener";
import { Constants } from "../data/Constants";
import { UpdateLabelValue } from "../data/UpdateLabelValue";
const { ccclass, property } = _decorator;

@ccclass("LoadingUI")
export class LoadingUI extends Component {
    @property({
        type: UpdateLabelValue
    })
    progressLabel: UpdateLabelValue = null;
    private _progress = 0;

    public onEnable(){
        CustomEventListener.on(Constants.EventName.UPDATE_PROGRESS, this.updateProgress, this);
    }

    public onDisable(){
        CustomEventListener.off(Constants.EventName.UPDATE_PROGRESS, this.updateProgress, this);
    }

    public show(){
        this.node.active = true;
        this._progress = 50;
        this.progressLabel.playUpdateValue(this._progress, this._progress, 0);
    }

    public updateProgress(value: number){
        this.progressLabel.playUpdateValue(this._progress, this._progress + value, 0.2);
        this._progress += value;
    }

    public finishLoading(){
        this.progressLabel.playUpdateValue(this._progress, 100, 0.2);
        this._progress = 100;
        this.scheduleOnce(this._hide, 0.5);
    }

    private _hide(){
        this.node.active = false;
    }

}
