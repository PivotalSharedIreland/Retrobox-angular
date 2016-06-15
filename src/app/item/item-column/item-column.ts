import {Component, Input, SimpleChange} from "angular2/core";
import {RetroItem} from "../../store/retroitem";
import RetroRow from "../retroitem/retrorow";
import {ControlGroup, FormBuilder, Control, Validators} from "angular2/common";
import RetroStore from "../../store/retrostore";
import {StatusFilterPipe} from "../status-filter-pipe";

@Component({
    selector: 'item-column',
    templateUrl: 'app/item/item-column/item-column.html',
    styleUrls: ['styles/retrolist.css'],
    directives: [RetroRow],
    pipes: [StatusFilterPipe]
})

export default class ItemColumn {

    @Input() items:RetroItem[];
    @Input() type:string;
    @Input() sortByLikes:Boolean;
    @Input() filterArgs = {status: 'ARCHIVED'};

    public itemMessage:Control;

    formBuilder:FormBuilder;
    itemForm:ControlGroup;

    store:RetroStore;
    storeError:Error;

    columnHeader = {'HAPPY': ':)', 'MEDIOCRE': ':/', 'UNHAPPY': ':('}

    constructor(store:RetroStore, formBuilder:FormBuilder) {
        this.store = store;
        this.formBuilder = formBuilder;

        this.itemMessage = new Control('', Validators.required);

        this.itemForm = this.formBuilder.group({
            itemMessage: this.itemMessage
        });
    }

    ngOnInit() {
        this.getItems();
    }


    ngOnChanges(changes:{[propKey:string]:SimpleChange}) {
        if (changes['sortByLikes'].currentValue != changes['sortByLikes'].previousValue) {
            this.getItems();
        }
    }

    addItem() {
        let item = new RetroItem({boardId: 1, message: this.itemMessage.value, type: this.type});
        this.store.addItem(item).subscribe({
                next: (data:RetroItem) => console.log('RetroRow successfully added: ', data),
                error: error => this.errorHandler(error),
                complete: () => {
                    this.resetForm();
                    this.getItems();
                }
            }
        );
    }

    getColumnHeader() {
        return this.columnHeader[this.type];
    }


    private errorHandler(error:Error) {
        console.log(error.message);
        this.storeError = error;
    }


    private resetForm() {
        this.itemForm = this.formBuilder.group({ //TODO refactor?
            itemMessage: [""]
        });

    }

    private getItems():void {
        this.store
            .getItems()
            .subscribe({
                next: (data:RetroItem[]) => this.updateLists(data),
                error: (error) => this.errorHandler(error),
                complete: () => console.log('Get board complete')
            });

    }

    private updateLists(items:RetroItem[]) {
        this.items = items;
        this.items = this.getItemsOfType(this.type);
    }

    private getItemsOfType(expectedType:string):RetroItem[] {
        if (this.items) {
            let result = this.items.filter((i) => i.type === expectedType);
            return this.sortByLikes ? result.sort((item1, item2) => item2.likes - item1.likes) : result;
        }
        return [];
    }

    removeItem(itemId:number) {
        this.store.deleteItem(itemId).subscribe({
                next: () => console.log(`RetroRow with Id ${itemId} successfully deleted`),
                error: error => this.errorHandler(error),
                complete: () => {
                    this.getItems();
                }
            }
        );
    }
}
