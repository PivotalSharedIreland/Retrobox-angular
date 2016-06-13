import ActionComponent from "../action.component";
import {it} from "angular2/testing";
import {Action} from "../action";
import {Observable} from "rxjs/Observable";
import {FormBuilder, Validators, Control} from "angular2/common";


describe('ActionComponent', () => {

    var mockActionService;
    var formBuilder;
    var getActionsSpy;

    beforeEach(function () {
        mockActionService = {
            getActions: function () {}
        };
        formBuilder = new FormBuilder();

        getActionsSpy = spyOn(mockActionService, 'getActions').and.returnValue(
            Observable.create(observer => {
                observer.next([
                        new Action({
                            id: 1, 
                            boardId: 1, 
                            description: "I'm a message", 
                            owner: 'Owner1', 
                            creationDate: "2016-01-01T21:30:00Z",
                            lastModifiedDate: "2016-01-01T21:30:00Z"
                        }),
                        new Action({
                            id: 2, 
                            boardId: 1,
                            description: "I'm another message", 
                            owner: 'ACTIVE', 
                            creationDate: "2016-01-01T21:30:00Z", 
                            lastModifiedDate: "2016-01-01T21:30:00Z"
                        }),
                        new Action({
                            id: 3,
                            boardId: 1,
                            description: "I'm a different message",
                            owner: 'ACTIVE',
                            creationDate: "2016-01-01T21:32:00Z",
                            lastModifiedDate: "2016-01-01T21:32:00Z"
                        }),
                        new Action({
                            id: 4,
                            boardId: 1,
                            description: "I'm a different message",
                            owner: 'ARCHIVED',
                            creationDate: "2016-01-01T21:32:00Z",
                            lastModifiedDate: "2016-01-01T21:32:00Z"
                        })
                    ]
                );
                observer.complete();
            })
        );
    });

    it("should add action on 'add button' click when valid input", () => {
        let actionComponent = new ActionComponent(mockActionService, formBuilder);
        let expectedAction = new Action({boardId: 1, description: "foo", owner: "bar"});

        mockActionService.addAction = function (action) {
            expect(action).toEqual(expectedAction);
            return Observable.create(observer => {
                observer.next(null);
                observer.complete();
            })
        };

        spyOn(mockActionService, 'addAction').and.callThrough();

        actionComponent.description = new Control('foo', Validators.required);
        actionComponent.owner = new Control('bar', Validators.required);

        actionComponent.addAction();

        expect(mockActionService.addAction).toHaveBeenCalledWith(expectedAction);

        setTimeout(function () {
            //The framework takes some time to rebuild the form and re-bind the controls
            expect(actionComponent.description.value).toEqual('');
            expect(actionComponent.owner.value).toEqual('');
        }, 100);

    });

    it('should get list of actions', () => {
        let actionComponent = new ActionComponent(mockActionService, formBuilder);
        
        actionComponent.getActions();

        expect(mockActionService.getActions).toHaveBeenCalled();
        expect(actionComponent.actions.length).toEqual(4);
    });

});

