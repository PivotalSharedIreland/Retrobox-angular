import {List} from 'immutable';
import {RetroItem} from './retroitem';

export interface ITodoAction {
    type:string;
    text?:string;
    itemId?:number;
    completed?:boolean;
}

export function reducer(state:List<RetroItem> = List<RetroItem>(), action:ITodoAction) {
    
    switch (action.type) {
        case 'ADD':
            let message = new RetroItem({message: action.text});
            return state.push(message);
        case 'REMOVE':
            return List<RetroItem>(state.filter((i:RetroItem) => i.id !== action.itemId));
        // case 'UPDATE_ITEM_TEXT':
        //     return state.update(indexOf(action.itemId), (i:RetroItem) => i.message = action.text);
        // case 'UPDATE_ITEM_COMPLETION':
        //     return state.update(indexOf(action.itemId), (i:RetroItem) => i.status = i.status === 'ARCHIVED' ? 'ACTIVE' : 'ARCHIVED');
        default:
            return state;
    }
}
