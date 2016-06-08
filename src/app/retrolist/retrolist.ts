import {Component, Inject} from 'angular2/core';
import RetroStore from '../store/retrostore';
import RetroRow from '../retroitem/retrorow';
import {RetroItem} from '../store/retroitem';
import {Board} from '../store/board';
import {Observable} from 'rxjs/Rx';
import {StatusFilterPipe} from "./status-filter-pipe";
import {FormBuilder, Control, Validators, ControlGroup} from "angular2/common";

@Component({
    selector: 'retro-list',
    templateUrl: 'app/retrolist/retrolist.html',
    styleUrls: ['styles/retrolist.css'],
    directives: [RetroRow],
    pipes: [StatusFilterPipe]
})
export default class RetroList {

    formBuilder:FormBuilder;
    happyForm:ControlGroup;
    mediocreForm:ControlGroup;
    unhappyForm:ControlGroup;

    public happyMessage:Control;
    public mediocreMessage:Control;
    public unhappyMessage:Control;

    board:Board;
    store:RetroStore;
    happyItems:RetroItem[];
    mediocreItems:RetroItem[];
    unhappyItems:RetroItem[];
    storeError:Error;
    sortByLikes:Boolean = false;
    filterArgs = {status: 'ACTIVE'};
    private messageTypes;


    constructor(store:RetroStore, formBuilder:FormBuilder) {
        this.store = store;
        this.formBuilder = formBuilder;

        this.happyMessage = new Control('', Validators.required);
        this.mediocreMessage = new Control('', Validators.required);
        this.unhappyMessage = new Control('', Validators.required);

        this.happyForm = this.formBuilder.group({
            happyMessage: this.happyMessage
        });
        this.mediocreForm = this.formBuilder.group({
            mediocreMessage: this.mediocreMessage
        });
        this.unhappyForm = this.formBuilder.group({
            unhappyMessage: this.unhappyMessage
        });

        this.messageTypes = {
            "HAPPY": this.happyMessage,
            "MEDIOCRE": this.mediocreMessage,
            "UNHAPPY": this.unhappyMessage
        };

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

    addItem(type:string) {

        let item = new RetroItem({boardId: 1, message: this.getMessage(type), type: type});
        this.store.addItem(item).subscribe({
                next: (data:RetroItem) => console.log('RetroRow successfully added: ', data),
                error: error => this.errorHandler(error),
                complete: () => {
                    this.resetForm();
                    this.getBoard();
                }
            }
        );
    }

    private getMessage(type:string) {
        return this.messageTypes = {
            "HAPPY": this.happyMessage,
            "MEDIOCRE": this.mediocreMessage,
            "UNHAPPY": this.unhappyMessage
        }[type].value;
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

    private resetForm() {
        this.happyForm = this.formBuilder.group({ //TODO refactor?
            happyMessage: [""]
        });
        this.mediocreForm = this.formBuilder.group({
            mediocreMessage: [""]
        });
        this.unhappyForm = this.formBuilder.group({
            unhappyMessage: [""]
        });
    }
}
