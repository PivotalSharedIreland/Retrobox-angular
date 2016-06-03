import {Component, Inject} from 'angular2/core';
import ActionService from "./action.service";
import {Action} from "./action";

@Component({
    selector: 'action-list',
    templateUrl: 'app/action/action-list.component.html',
    styleUrls: ['styles/retrolist.css'] //FIXME gp + dw: review global styles
})
export default class ActionListComponent {

    public hasValidationErrors: boolean;
    actionService: ActionService;

    constructor(actionService: ActionService) {
        this.actionService = actionService;
        this.hasValidationErrors = false;
    }

    addAction(descriptionElement:HTMLInputElement, ownerElement:HTMLInputElement) {
        //TODO gp + dw: introduce validations in client side
        let action = new Action({description: descriptionElement.value, owner: ownerElement.value});
        this.actionService.addAction(action).subscribe({
                next: () => console.log('Action successfully added: ${action} '),
                error: error => {
                    this.handleServerError(error);
                },
                complete: () =>  {
                    this.resetFields(descriptionElement, ownerElement);
                }
            }
        );
    }

    private resetFields(descriptionElement:HTMLInputElement, ownerElement:HTMLInputElement) {
        this.hasValidationErrors = false;
        descriptionElement.value = '';
        ownerElement.value = '';
    }

    private handleServerError(error) {
        console.log(error); //TODO gp + dw: error is highligting both fields, this must be changed for informing about the actual problem
        this.hasValidationErrors = true;
    }

}
