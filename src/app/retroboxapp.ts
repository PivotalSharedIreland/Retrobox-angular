import {Component} from 'angular2/core';
import RetroStore from "./store/retrostore";
import Action from "./action/action.component";
import ActionService from "./action/action.service";
import Item from "./item/item";

@Component({
    selector: 'retro-box',
    templateUrl: 'app/retrobox.html',
    providers: [RetroStore, ActionService], //TODO rename retrostore?
    directives: [Item, Action]
})
export default class RetroBoxApp { }
