import {Component, Inject} from 'angular2/core';
import ActionService from "./action.service";
import {Action} from "./action";
import {FormBuilder, Control, ControlGroup, Validators} from "angular2/common";

@Component({
    selector: 'action-list',
    templateUrl: 'app/action/action-list.component.html',
    styleUrls: ['styles/retrolist.css'] //FIXME gp + dw: review global styles
})
export default class ActionListComponent {

    actionService: ActionService;
    formBuilder:FormBuilder;
    form: ControlGroup;

    public description: Control;
    public owner: Control;

    constructor(actionService: ActionService, formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.actionService = actionService;
        
        this.description = new Control('', Validators.required);
        this.owner = new Control('', Validators.required);

        this.form = this.formBuilder.group({
            description: this.description,
            owner: this.owner
        })
    }

    addAction() {
        let action = new Action({description: this.description.value, owner: this.owner.value});
        this.actionService.addAction(action).subscribe({
                next: () => console.log('Action successfully added: ${action}'),
                error: error => {
                    this.handleServerError(error);
                },
                complete: () =>  {
                    this.resetForm();
                }
            }
        );
    }

    private resetForm() {
        this.form = this.formBuilder.group({
            description: [""],
            owner: [""]
        });
    }

    private handleServerError(error) {
        console.log(error); //TODO error handling?
    }

}
