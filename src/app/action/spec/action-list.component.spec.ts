import ActionListComponent from "../action-list.component";
import {it} from "angular2/testing";
import {Action} from "../action";
import {Observable} from "rxjs/Observable";


describe('ActionListComponent', () => {

    var mockActionService;

    beforeEach(function () {
        mockActionService = {};
    });

    it("should add action on 'add button' click when valid input", () => {
        let actionListComponent = new ActionListComponent(mockActionService);
       
        let descriptionElement = <HTMLInputElement> {value: "foo"};
        let ownerElement = <HTMLInputElement> {value: "bar"};
        let expectedAction = new Action({description: "foo", owner: "bar"});
       
        mockActionService.addAction = function (action) {
            expect(action).toEqual(expectedAction);
            return Observable.create(observer => {
                observer.next(null);
                observer.complete();
            })
        };
        spyOn(mockActionService, 'addAction').and.callThrough();
       
        actionListComponent.addAction(descriptionElement, ownerElement);
        expect(mockActionService.addAction).toHaveBeenCalledWith(expectedAction);
        expect(descriptionElement.value).toEqual('');
        expect(ownerElement.value).toEqual('');
    });

    it("should report error on 'add button' click when empty description input", () => {
        let actionListComponent = new ActionListComponent(mockActionService);

        let descriptionElement = <HTMLInputElement> {value: ""};
        let ownerElement = <HTMLInputElement> {value: "bar"};
        let expectedAction = new Action({description: "", owner: "bar"});

        mockActionService.addAction = function (action) {
            expect(action).toEqual(expectedAction);
            return Observable.create(observer => {
                observer.next(null);
                observer.error("some error");
            })
        };
        spyOn(mockActionService, 'addAction').and.callThrough();

        actionListComponent.addAction(descriptionElement, ownerElement);
        expect(mockActionService.addAction).toHaveBeenCalledWith(expectedAction);
        expect(actionListComponent.hasValidationErrors).toEqual(true);
    });

    it("should report error on 'add button' click when empty owner input", () => {
        let actionListComponent = new ActionListComponent(mockActionService);

        let descriptionElement = <HTMLInputElement> {value: "foo"};
        let ownerElement = <HTMLInputElement> {value: ""};
        let expectedAction = new Action({description: "foo", owner: ""});

        mockActionService.addAction = function (action) {
            expect(action).toEqual(expectedAction);
            return Observable.create(observer => {
                observer.next(null);
                observer.error("some error");
            })
        };
        spyOn(mockActionService, 'addAction').and.callThrough();

        actionListComponent.addAction(descriptionElement, ownerElement);
        expect(mockActionService.addAction).toHaveBeenCalledWith(expectedAction);
        expect(actionListComponent.hasValidationErrors).toEqual(true);
    });
});

