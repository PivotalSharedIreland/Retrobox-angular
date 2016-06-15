import {FormBuilder, Validators, Control} from "angular2/common";
import ItemColumn from "../item-column";
import {RetroItem} from "../../../store/retroitem";
import {Observable} from "rxjs/Rx";

var mockStore;
var formBuilder;
var getItemsSpy;

describe('ItemColumn component', () => {

    function buildRetroItem(id, boardId, message, status, type, likes, creationDate, lastModifiedDate) {
        let item1 = new RetroItem({
            boardId: boardId,
            id: id,
            message: message,
            status: status,
            type: type,
            likes: likes
        });
        item1.creationDate = creationDate;
        item1.lastModifiedDate = lastModifiedDate;
        return item1;
    }

    beforeEach(function () {
        mockStore = {
            addItem: function () {
            },
            getItems: function () {
            }
        };

        formBuilder = new FormBuilder();

        getItemsSpy = spyOn(mockStore, 'getItems').and.returnValue(
            Observable.create(observer => {
                observer.next([
                    buildRetroItem(1, 1, "I'm a message", 'ACTIVE', 'HAPPY', 0, "2016-01-01T21:30:00Z", "2016-01-01T21:30:00Z"),
                    buildRetroItem(2, 1, "I'm another message", 'ACTIVE', 'HAPPY', 3, "2016-01-01T21:30:00Z", "2016-01-01T21:30:00Z"),
                    buildRetroItem(3, 1, "I'm a different message", 'ACTIVE', 'UNHAPPY', 1, "2016-01-01T21:32:00Z", "2016-01-01T21:32:00Z"),
                    buildRetroItem(4, 1, "I'm a different message", 'ARCHIVED', 'MEDIOCRE', 1, "2016-01-01T21:32:00Z", "2016-01-01T21:32:00Z")]
                );
                observer.complete();
            })
        );

    });


    it('should load the board when created', () => {
        let itemColumn = new ItemColumn(mockStore, formBuilder);
        itemColumn.type = 'HAPPY';
        itemColumn.ngOnInit();
        expect(getItemsSpy.calls.count()).toBe(1);
        expect(itemColumn.items).not.toBe(null);
        expect(itemColumn.items.length).toBe(2);
        expect(itemColumn.items[0].id).toBe(1);
        expect(itemColumn.items[0].likes).toBe(0);
        expect(itemColumn.items[1].id).toBe(2);
        expect(itemColumn.items[1].likes).toBe(3);
    });

    it('should tell the store to add an item and update the board', () => {
        let itemColumn = new ItemColumn(mockStore, formBuilder);
        let expectedItem = new RetroItem({boardId: 1, message: 'foo', type: 'HAPPY'});

        mockStore.addItem = function (item) {
            expect(item).toEqual(expectedItem);
            return Observable.create(observer => {
                observer.next(null);
                observer.complete();
            })
        };

        spyOn(mockStore, 'addItem').and.callThrough();

        itemColumn.type = 'HAPPY';
        itemColumn.itemMessage = new Control('foo', Validators.required);

        itemColumn.addItem();

        expect(mockStore.addItem).toHaveBeenCalledWith(expectedItem);
        setTimeout(function () {
            //The framework takes some time to rebuild the form and re-bind the controls
            expect(itemColumn.itemMessage.value).toEqual('');
        }, 100);
        expect(mockStore.getItems).toHaveBeenCalled();
    });

    it('should handle an error while adding an item', () => {
        var error = new Error("Some problem");
        mockStore.addItem = function () {
            return Observable.throw(error);
        };
        spyOn(mockStore, 'addItem').and.callThrough();

        let itemColumn = new ItemColumn(mockStore, formBuilder);
        itemColumn.type = 'HAPPY';
        itemColumn.itemMessage = new Control('Test message', Validators.required);
        itemColumn.addItem();

        expect(itemColumn.storeError).toBe(error);
    });

    it('should tell the store to delete an item and update the list of items', () => {
        let itemColumn = new ItemColumn(mockStore, formBuilder);

        mockStore.deleteItem = function (itemId) {
            expect(itemId).toEqual(1);
            return Observable.create(observer => {
                observer.next(null);
                observer.complete();
            })
        };

        spyOn(mockStore, 'deleteItem').and.callThrough();
        itemColumn.removeItem(1);

        expect(mockStore.deleteItem).toHaveBeenCalledWith(1);
        expect(mockStore.getItems).toHaveBeenCalled();
    });

    it('should handle an error while deleting an item', () => {
        var error = new Error("Some problem");
        mockStore.deleteItem = function () {
            return Observable.throw(error);
        };
        spyOn(mockStore, 'deleteItem').and.callThrough();

        let itemColumn = new ItemColumn(mockStore, formBuilder);
        itemColumn.removeItem(1);

        expect(itemColumn.storeError).toBe(error);
    });

});
