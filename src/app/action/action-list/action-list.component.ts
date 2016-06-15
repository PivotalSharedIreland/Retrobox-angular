import {Component, Input, SimpleChange} from "angular2/core";
import ActionService from "./../action.service";
import {Action} from "./../action";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'action-list',
    templateUrl: 'app/action/action-list/action-list.component.html',
    styleUrls: ['styles/retrolist.css'] //FIXME gp + dw: review global styles
})

export default class ActionListComponent {

    actionService: ActionService;
    actions: Action[];

    @Input() refreshActionList: boolean;

    constructor(actionService: ActionService){
        this.actionService = actionService;

        this.getActions();

        Observable
            .interval(10000)
            .subscribe(() => this.getActions());
    }

    ngOnChanges(changes: {[propKey:string]: SimpleChange}){
        this.getActions();
        this.refreshActionList = false;
    }

    getActions() {
        this.actionService.getActions().subscribe({
            next: (data:Action[]) => this.actions = data,
            error: (error) => console.log("ERROR!"),
            complete: () => console.log('Get actions complete')
        });
    }
}
