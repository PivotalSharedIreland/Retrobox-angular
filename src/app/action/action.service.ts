import {Http, Headers} from "angular2/http";
import {Action} from "./action";
import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";

@Injectable()
export default class ActionService {
    _http:Http;
    _headers:Headers;
    baseUrl:string = 'http://localhost:8080';

    constructor(http:Http) {
        this._http = http;
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
    }

    public getActions():Observable<Action[]> {
        return this._http.get(`${this.baseUrl}/actions?boardId=1` , {headers: this._headers})
            .map(res => res.json());
    }
    
    public addAction(action:Action):Observable<Action> {
        return this._http.post(`${this.baseUrl}/actions`, JSON.stringify(action), {headers: this._headers})
            .map(res => res.json());
    }
}
