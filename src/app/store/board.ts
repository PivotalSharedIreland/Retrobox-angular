import {List} from 'immutable';
import {RetroItem} from './retroitem';

export class Board {

    private _items:List<RetroItem>;

    get items():List<RetroItem> {
        return this._items;
    }

    set items(value:List<RetroItem>) {
        this._items = value;
    }
}
