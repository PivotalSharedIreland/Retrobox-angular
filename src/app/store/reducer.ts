
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {RetroItem} from "./retroitem";


// export interface ITodoAction {
//     type:string;
//     text?:string;
//     itemId?:number;
//     completed?:boolean;
// }

// export function reducer(state:RetroRow[], action:ITodoAction) {
//    
//     switch (action.type) {
//         case 'ADD':
//             let message = new RetroRow({message: action.text});
//             return state.push(message);
//         case 'REMOVE':
//             return state.filter((i:RetroRow) => i.id !== action.itemId);
//         // case 'UPDATE_ITEM_TEXT':
//         //     return state.update(indexOf(action.itemId), (i:RetroRow) => i.message = action.text);
//         // case 'UPDATE_ITEM_COMPLETION':
//         //     return state.update(indexOf(action.itemId), (i:RetroRow) => i.status = i.status === 'ARCHIVED' ? 'ACTIVE' : 'ARCHIVED');
//         default:
//             return state;
//     }
// }
