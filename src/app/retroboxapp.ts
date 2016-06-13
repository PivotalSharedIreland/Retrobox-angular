import {Component} from 'angular2/core';
import RetroList from "./item/retrolist/retrolist";
import RetroStore from "./store/retrostore";
import Action from "./action/action.component";
import ActionService from "./action/action.service";

@Component({
    selector: 'retro-box',
    templateUrl: 'app/retrobox.html',
    providers: [RetroStore, ActionService], //TODO rename retrostore?
    directives: [RetroList, Action]
})
export default class RetroBoxApp { }
