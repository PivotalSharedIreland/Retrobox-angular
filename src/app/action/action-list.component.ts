import {Component} from 'angular2/core';
import {ControlGroup, Control, Validators, FormBuilder} from 'angular2/common';
import ActionService from "./action.service";
import {Action} from "./action";

@Component({
    selector: 'action-list',
    templateUrl: 'app/action/action-list.component.html',
    styleUrls: ['styles/retrolist.css'] //FIXME gp + dw: review global styles
})
export default class ActionListComponent {

    description:Control;
    owner:Control;
    actionService:ActionService;

    private builder;
    form:ControlGroup;

    constructor(actionService:ActionService, builder:FormBuilder) {
        this.actionService = actionService;
        this.builder = builder;

        this.description = new Control('', Validators.required);
        this.owner = new Control('', Validators.required);

        this.form = this.builder.group({
            description: this.description,
            owner: this.owner
        })
    }


    addAction() {

        let action = new Action({description: this.description.value, owner: this.owner.value});
        this.actionService.addAction(action).subscribe({
                next: () => console.log('Action successfully added: ${action} '),
                error: error => {
                    this.handleServerError(error);
                },
                complete: () => {
                    this.resetForm();
                }
            }
        );
    }

    private resetForm() {
        this.form = this.builder.group({
            description: [""],
            owner: [""]
        });
    }

    private handleServerError(error) {
        console.log(error); //TODO gp + dw: error is highligting both fields, this must be changed for informing about the actual problem
    }

}
