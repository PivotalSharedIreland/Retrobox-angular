import {Component, Inject} from 'angular2/core';
import {List} from 'immutable';
import TodoStore from '../store/retrostore';
import RetroItem from '../retroitem/retroitem';
import ItemUpdatedEvent from '../retroitem/itemupdatedevent';
import {addItem, removeItem, updateItemText, updateItemCompletion} from '../store/actions';
import {RetroItem as RetroItemModel} from '../store/retroitem';
import {Board} from '../store/board';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'retro-list',
    templateUrl: 'app/retrolist/retrolist.html',
    styleUrls: ['app/retrolist/retrolist.css'],
    directives: [RetroItem],
})
export default class RetroList {

    board: Board;
    newItem = '';
    store:TodoStore;
    happyItems:List<RetroItemModel>;
    mediocreItems:List<RetroItemModel>;
    unhappyItems:List<RetroItemModel>;

    constructor(@Inject(TodoStore) store:TodoStore) {
        this.store = store;

        Observable
            .interval(10000)
            .subscribe(() => this.getBoard());

        this.getBoard();
    }


    addItem() {
        this.store.dispatch(addItem(this.newItem));
        this.newItem = '';
    }

    removeItem(itemId:number) {
        this.store.dispatch(removeItem(itemId));
    }

    itemUpdated(event:ItemUpdatedEvent) {
        if (event.text !== undefined) {
            if (event.text === '') {
                this.store.dispatch(removeItem(event.itemId));
            } else {
                this.store.dispatch(updateItemText(event.itemId, event.text));
            }
        }
        if (event.completed !== undefined) {
            this.store.dispatch(updateItemCompletion(event.itemId, event.completed));
        }
    }

    private getBoard():void {
        this.store
            .getBoard()
            .subscribe(
                (data:Board) => this.updateLists(data),
                error => console.log(error),
                () => console.log('Get board complete'));

    }

    private updateLists(board: Board) {
        this.board = board;
        this.happyItems = this.getItems('HAPPY');
        this.mediocreItems = this.getItems('MEDIOCRE');
        this.unhappyItems = this.getItems('UNHAPPY');
    }
    
    private getItems(expectedType:string):List<RetroItemModel> {
        if (this.board) {
            return <List<RetroItemModel>>this.board.items.filter(function (i) {
                return i.type === expectedType;
            });
        }
        return List<RetroItemModel>();
    }
}
