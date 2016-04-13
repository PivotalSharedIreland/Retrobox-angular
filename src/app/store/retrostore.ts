import {Injectable} from 'angular2/core';
import {ITodoAction} from './reducer';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {RetroItem} from './retroitem';

@Injectable()
export default class RetroStore {
    _http:Http;
    _headers:Headers;

    constructor(http:Http) {
        this._http = http;
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');

    }

    public getBoard():Observable<Response> {
        return this._http.get('http://retrobox-api.cfapps.io/board/1').map(res => res.json());
    }

    public addItem(item:RetroItem):Observable<Response> {
        return this._http.post('http://retrobox-api.cfapps.io/items', JSON.stringify(item), {headers: this._headers});
    }

    dispatch(action:ITodoAction) {
        // this.store.dispatch(action);
    }
}
