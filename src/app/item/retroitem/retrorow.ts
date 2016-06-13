import {Component, Input, Output, Inject, EventEmitter, ChangeDetectionStrategy} from 'angular2/core';
import {RetroItem} from '../../store/retroitem';
import RetroStore from '../../store/retrostore';

@Component({
    selector: 'retro-item',
    templateUrl: 'app/retroitem/retrorow.html',
    styleUrls: ['styles/retrorow.css']
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

    doneClicked() {
        this.done.emit(this.item.id);
    }

    updateStatus() {
        let originalState = this.item.status;
        this.item.status = originalState === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE';

        this.store.updateItem(this.item).subscribe({
                next: (data) => console.log('RetroRow successfully archived'),
                error: error => {
                    console.log(error);
                    this.item.status = originalState;
                }
            }
        );
    }

    like() {
        this.store.likeItem(this.item.id).subscribe({
                next: () => {
                    console.log('RetroRow successfully liked');
                    this.item.likes++;
                },
                error: error => console.log(error)
            }
        );
    }
}
