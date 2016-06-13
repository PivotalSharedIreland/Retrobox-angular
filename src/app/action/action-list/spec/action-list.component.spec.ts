import {it} from "angular2/testing";
import {Action} from "../../action";
import {Observable} from "rxjs/Observable";
import ActionListComponent from "../action-list.component";

var getActionsSpy;
var mockActionService;

beforeEach(function () {
    mockActionService = {
        getActions: function () {
        }
    };

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
        }))
})

describe('ActionListComponent', () => {
    it('should get list of actions', () => {
        let actionListComponent = new ActionListComponent(mockActionService);

        actionListComponent.getActions();

        expect(mockActionService.getActions).toHaveBeenCalled();
        expect(actionListComponent.actions.length).toEqual(4);
    });
});
