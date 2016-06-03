import {Component} from 'angular2/core';
import RetroList from "./retrolist/retrolist";
import RetroStore from "./store/retrostore";
import ActionList from "./action/action-list.component";
import ActionService from "./action/action.service";

@Component({
    selector: 'retro-box',
    templateUrl: 'app/retrobox.html',
    providers: [RetroStore, ActionService], //TODO rename retrostore?
    directives: [RetroList, ActionList] 
})
export default class RetroBoxApp { }
