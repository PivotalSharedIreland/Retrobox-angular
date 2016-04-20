import {Component, Input, Output, Inject, EventEmitter, ChangeDetectionStrategy} from 'angular2/core';
import {RetroItem} from './../store/retroitem';
import RetroStore from '../store/retrostore';
import ItemUpdatedEvent from './itemupdatedevent';

@Component({
    selector: 'retro-item',
    templateUrl: 'app/retroitem/retrorow.html',
    styleUrls: ['styles/retrorow.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RetroRow {

    store:RetroStore;
    editMode = false;

    constructor(@Inject(RetroStore) store:RetroStore) {
        this.store = store;
    }

    @Input()
    item:RetroItem;

    @Output()
    done = new EventEmitter<number>();

    @Output()
    itemUpdated = new EventEmitter<ItemUpdatedEvent>();

    doneClicked() {
        this.done.emit(this.item.id);
    }

    archive() {
        this.item.status = 'ARCHIVED';

        this.store.updateItem(this.item).subscribe({
                next: (data) => console.log('RetroRow successfully archived'),
                error: error => {
                    console.log(error);
                    this.item.status = 'ACTIVE';
                }
            }
        );
    }


    enterEditMode(element:HTMLInputElement) {
        this.editMode = true;
        if (this.editMode) {
            setTimeout(() => {
                element.focus();
            }, 0);
        }
    }

    cancelEdit(element:HTMLInputElement) {
        this.editMode = false;
        element.value = this.item.message;
    }

    commitEdit(updatedText:string) {
        this.editMode = false;
        this.itemUpdated.emit({
            itemId: this.item.id,
            text: updatedText
        });
    }
}
