import {RetroItem} from './retroitem';

export class Board {

    private _items:RetroItem[];

    get items():RetroItem[] {
        return this._items;
    }

    set items(value:RetroItem[]) {
        this._items = value;
    }
}
