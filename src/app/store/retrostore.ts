import {Injectable} from 'angular2/core';
import {List} from 'immutable';
import {RetroItem} from './retroitem';
import {ITodoAction} from './reducer';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export default class RetroStore {
    _http:Http;

    constructor(http: Http) {
        this._http = http;
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
