import {Injectable} from 'angular2/core';
import {List} from 'immutable';
import {RetroItem} from './retroitem';
// import {createStore} from 'redux';
// import {reducer, ITodoAction} from './reducer';
import {ITodoAction} from './reducer';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export default class TodoStore {
    // store:Redux.Store;
    _http:Http;

    constructor(http: Http) {
        this._http = http;
        // const storedItemsString = <string> localStorage.getItem('todolist') || '[]';
        // const storedItems = <Array<any>> JSON.parse(storedItemsString);
        // const items = List<RetroItem>(storedItems.map(i => new RetroItem()));
        // this.store = createStore(reducer, items);
        //
        // this.store.subscribe(() => {
        //     localStorage.setItem('todolist', JSON.stringify(this.items.toJS()));
        // });
    }

    get items():List<RetroItem> {
        return List.of(
            new RetroItem(1, 1, 'happy text', 'ACTIVE', 'HAPPY', 0),
            new RetroItem(1, 1, 'mediocre text', 'ACTIVE', 'MEDIOCRE', 0),
            new RetroItem(1, 1, 'unhappy text', 'ACTIVE', 'UNHAPPY', 0));
    }

    public getBoard(): Observable<Response> {
        return this._http.get('http://retrobox-api.cfapps.io/board/1').map(res => res.json());
    }

    dispatch(action:ITodoAction) {
        // this.store.dispatch(action);
    }
}
