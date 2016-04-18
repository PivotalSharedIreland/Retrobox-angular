import {Component, Inject} from 'angular2/core';
import RetroStore from '../store/retrostore';
import RetroItem from '../retroitem/retroitem';
import {RetroItem as RetroItemModel} from '../store/retroitem';
import {Board} from '../store/board';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'retro-list',
    templateUrl: 'app/retrolist/retrolist.html',
    styleUrls: ['styles/retrolist.css'],
    directives: [RetroItem],
})
export default class RetroList {

    board:Board;
    store:RetroStore;
    happyItems:RetroItemModel[];
    mediocreItems:RetroItemModel[];
    unhappyItems:RetroItemModel[];
    storeError: Error;

    constructor(@Inject(RetroStore) store:RetroStore) {
        this.store = store;

        Observable
            .interval(10000)
            .subscribe(() => this.getBoard());

        this.getBoard();
    }

    addItem(type:string, element:HTMLInputElement) {
        let item = new RetroItemModel({boardId: 1, message: element.value, type: type});
        this.store.addItem(item).subscribe({
            next: (data: RetroItemModel) => console.log('RetroItem successfully added: ', data),
            error: error => this.errorHandler(error),
            complete: () => {
                element.value = '';
                this.getBoard();
            }}
        );
    }

    removeItem(itemId:number) {
        // this.store.dispatch(removeItem(itemId));
    }

    private errorHandler(error: Error) {
        console.log(error.message);
        this.storeError = error;
    }

    private getBoard():void {

        this.store
            .getBoard()
            .subscribe({
                next: (data:Board) => this.updateLists(data),
                error: (error) => this.errorHandler(error),
                complete: () => console.log('Get board complete')
            });

    }

    private updateLists(board:Board) {
        this.board = board;
        this.happyItems = this.getItems('HAPPY');
        this.mediocreItems = this.getItems('MEDIOCRE');
        this.unhappyItems = this.getItems('UNHAPPY');
    }

    private getItems(expectedType:string):RetroItemModel[] {
        if (this.board) {
            return this.board.items.filter(function (i) {
                return i.type === expectedType;
            });
        }
        return [];
    }
}
