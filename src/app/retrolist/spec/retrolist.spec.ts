import RetroList from '../../../app/retrolist/retrolist';
import {Observable} from "rxjs/Observable";
import {RetroItem} from "../../store/retroitem";

describe('RetroList', () => {
    var mockStore;
    var getBoardSpy;

    beforeEach(function () {
        mockStore = {
            getBoard: function () {
            },
            addItem: function () {
            }
        };

        getBoardSpy = spyOn(mockStore, 'getBoard').and.returnValue(
            Observable.create(observer => {
                observer.next({
                    items: [
                        {
                            id: 1,
                            message: "I'm a message",
                            status: "ACTIVE",
                            type: "HAPPY",
                            likes: 0,
                            board_id: 1,
                            creation_date: "2016-01-01T20:30:00Z",
                            last_modified_date: "2016-01-01T20:30:00Z"
                        },
                        {
                            id: 2,
                            message: "I'm another message",
                            status: "ACTIVE",
                            type: "HAPPY",
                            likes: 3,
                            board_id: 1,
                            creation_date: "2016-01-01T21:30:00Z",
                            last_modified_date: "2016-01-01T21:30:00Z"
                        },
                        {
                            id: 3,
                            message: "I'm a different message",
                            status: "ACTIVE",
                            type: "UNHAPPY",
                            likes: 1,
                            board_id: 1,
                            creation_date: "2016-01-01T21:32:00Z",
                            last_modified_date: "2016-01-01T21:32:00Z"
                        },
                        {
                            id: 4,
                            message: "I'm a different message",
                            status: "ARCHIVED",
                            type: "MEDIOCRE",
                            likes: 1,
                            board_id: 1,
                            creation_date: "2016-01-01T21:32:00Z",
                            last_modified_date: "2016-01-01T21:32:00Z"
                        }]
                });
                observer.complete();
            })
        );
    });

    it('should load the board when created', () => {
        let retroList = new RetroList(mockStore);
        expect(mockStore.getBoard).toHaveBeenCalled();
        expect(retroList.board).not.toBe(null);
        expect(retroList.happyItems.length).toBe(2);
        expect(retroList.mediocreItems.length).toBe(1);
        expect(retroList.unhappyItems.length).toBe(1);
    });

    it ('should handle an error while getting the board', () => {
        var error = new Error("Some problem");
        mockStore.getBoard = function() {
            return Observable.throw(error);
        };
        spyOn(mockStore, 'getBoard').and.callThrough();

        let retroList = new RetroList(mockStore);
        expect(retroList.storeError).toBe(error);
    });
    
    it('should tell the store to add an item and update the board', () => {
        let retroList = new RetroList(mockStore);
        let element = <HTMLInputElement> {value: "Test message"};
        let expectedItem = new RetroItem({boardId: 1, message: element.value, type: 'HAPPY'});

        mockStore.addItem = function (item) {
            expect(item).toEqual(expectedItem);
            return Observable.create(observer => {
                observer.next(null);
                observer.complete();
            })
        };

        spyOn(mockStore, 'addItem').and.callThrough();
        retroList.addItem('HAPPY', element);

        expect(mockStore.addItem).toHaveBeenCalledWith(expectedItem);
        expect(getBoardSpy.calls.count()).toBe(2);
    });

    it ('should handle an error while adding an item', () => {
        var error = new Error("Some problem");
        mockStore.addItem = function() {
            return Observable.throw(error);
        };
        spyOn(mockStore, 'addItem').and.callThrough();

        let retroList = new RetroList(mockStore);
        let element = <HTMLInputElement> {value: "Test message"};
        retroList.addItem('HAPPY', element);
        
        expect(retroList.storeError).toBe(error);
    });
});



