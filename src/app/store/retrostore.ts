import {Injectable} from 'angular2/core';
import {ITodoAction} from './reducer';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export default class RetroStore {
    _http:Http;

    constructor(http: Http) {
        this._http = http;        
    }

    public getBoard(): Observable<Response> {
        return this._http.get('http://retrobox-api.cfapps.io/board/1').map(res => res.json());
    }

    dispatch(action:ITodoAction) {
        // this.store.dispatch(action);
    }
}
