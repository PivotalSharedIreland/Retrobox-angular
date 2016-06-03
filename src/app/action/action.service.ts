import {Http, Headers} from "angular2/http";
import {Action} from "./action";
import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";

@Injectable()
export default class ActionService {
    _http:Http;
    _headers:Headers;
    baseUrl:string = 'http://retrobox-api.cfapps.io';

    constructor(http:Http) {
        this._http = http;
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
    }

    public addAction(action:Action):Observable<Action> {
        return this._http.post(`${this.baseUrl}/actions`, JSON.stringify(action), {headers: this._headers})
            .map(res => res.json());
    }
}
