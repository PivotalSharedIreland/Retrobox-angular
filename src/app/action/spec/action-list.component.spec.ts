import ActionListComponent from "../action-list.component";
import {it} from "angular2/testing";
import {Action} from "../action";
import {Observable} from "rxjs/Observable";
import {FormBuilder, Validators, Control} from "angular2/common";


describe('ActionListComponent', () => {

    var mockActionService;
    var formBuilder;

    beforeEach(function () {
        mockActionService = {};
        formBuilder = new FormBuilder();
    });

    it("should add action on 'add button' click when valid input", () => {
        let actionListComponent = new ActionListComponent(mockActionService, formBuilder);
        let expectedAction = new Action({description: "foo", owner: "bar"});
       
        mockActionService.addAction = function (action) {
            expect(action).toEqual(expectedAction);
            return Observable.create(observer => {
                observer.next(null);
                observer.complete();
            })
        };
        
        spyOn(mockActionService, 'addAction').and.callThrough();
       
        actionListComponent.description = new Control('foo', Validators.required);
        actionListComponent.owner = new Control('bar', Validators.required);
        
        actionListComponent.addAction();
        
        expect(mockActionService.addAction).toHaveBeenCalledWith(expectedAction);

        setTimeout(function() {
            //The framework takes some time to rebuild the form and re-bind the controls
            expect(actionListComponent.description.value).toEqual('');
            expect(actionListComponent.owner.value).toEqual('');
        }, 100);
        
    });
    
});

