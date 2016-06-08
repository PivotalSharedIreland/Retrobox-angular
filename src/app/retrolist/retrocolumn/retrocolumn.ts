import {Component, Input, SimpleChange} from 'angular2/core';
import RetroRow from '../../retroitem/retrorow';
import {Observable} from 'rxjs/Rx';
import {RetroItem} from "../../store/retroitem";
import RetroStore from "../../store/retrostore";
import {Board} from "../../store/board";
import {StatusFilterPipe} from "../status-filter-pipe";

@Component({
    selector: 'retro-column',
    templateUrl: 'app/retrolist/retrocolumn/retrocolumn.html',
    styleUrls: ['styles/retrolist.css'],
    directives: [RetroRow],
    pipes: [StatusFilterPipe]
})

export default class RetroColumn {
    faces = {'HAPPY': ':)', 'MEDIOCRE': ':|', 'UNHAPPY': ':('};

    @Input() items:RetroItem[];
    @Input() board;
    @Input() columnType:string;
    @Input() sortByLikes:Boolean;
    @Input() filterArgs;

    store:RetroStore;
    storeError:Error;

    constructor(store:RetroStore) {
        this.filterArgs = {status: 'ACTIVE'};
        this.store = store;
        this.board = this.getBoard();

        Observable
            .interval(10000)
            .subscribe(() => this.getBoard());

    }

    ngOnChanges() {
        this.updateLists(this.board);
    }

    addItem(element:HTMLInputElement) {
        let item = new RetroItem({boardId: 1, message: element.value, type: this.columnType});
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
        this.store.deleteItem(itemId).subscribe({
                next: () => console.log(`RetroRow with Id ${itemId} successfully deleted`),
                error: error => this.errorHandler(error),
                complete: () => {
                    this.getBoard();
                }
            }
        );
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
        this.items = this.getItems(this.columnType);
    }

    private getItems(expectedType:string):RetroItem[] {
        if (this.board) {
            let result = this.board.items.filter((i) => i.type === expectedType);
            return this.sortByLikes ? result.sort((item1, item2) => item2.likes - item1.likes) : result;
        }
        return [];
    }
    private errorHandler(error:Error) {
        console.log(error.message);
        this.storeError = error;
    }
}
