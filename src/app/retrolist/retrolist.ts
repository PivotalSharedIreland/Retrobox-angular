import {Component, Inject} from 'angular2/core';
import RetroStore from '../store/retrostore';
import RetroRow from '../retroitem/retrorow';
import {RetroItem} from '../store/retroitem';
import {Board} from '../store/board';
import {Observable} from 'rxjs/Rx';
import {StatusFilterPipe} from "./statusFilterPipe";

@Component({
    selector: 'retro-list',
    templateUrl: 'app/retrolist/retrolist.html',
    styleUrls: ['styles/retrolist.css'],
    directives: [RetroRow],
    pipes: [StatusFilterPipe]
})
export default class RetroList {

    board:Board;
    store:RetroStore;
    happyItems:RetroItem[];
    mediocreItems:RetroItem[];
    unhappyItems:RetroItem[];
    storeError:Error;
    sortByLikes:Boolean = false;
    filterArgs = {status: 'ACTIVE'};

    constructor(@Inject(RetroStore) store:RetroStore) {
        this.store = store;

        Observable
            .interval(10000)
            .subscribe(() => this.getBoard());

        this.getBoard();
    }

    switchStatusFilter() {
        this.filterArgs.status = this.getAlternativeStatus();
    }
    
    getAlternativeStatus() {
        return this.filterArgs.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE"; 
    }

    switchOrderByLikes() {
        this.sortByLikes = !this.sortByLikes;
        this.getBoard();
    }

    addItem(type:string, element:HTMLInputElement) {
        let item = new RetroItem({boardId: 1, message: element.value, type: type});
        this.store.addItem(item).subscribe({
                next: (data:RetroItem) => console.log('RetroRow successfully added: ', data),
                error: error => this.errorHandler(error),
                complete: () => {
                    element.value = '';
                    this.getBoard();
                }
            }
        );
    }

    removeItem(itemId:number) {
        // this.store.dispatch(removeItem(itemId));
    }

    private errorHandler(error:Error) {
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

    private getItems(expectedType:string):RetroItem[] {
        if (this.board) {
            let result = this.board.items.filter((i) => i.type === expectedType);
            return this.sortByLikes ? result.sort((item1, item2) => item2.likes - item1.likes) : result;
        }
        return [];
    }

}
