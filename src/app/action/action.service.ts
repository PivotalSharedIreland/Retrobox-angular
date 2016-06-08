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
        var post = this._http.post(`${this.baseUrl}/actions`, JSON.stringify(action), {headers: this._headers});
        console.log("################################################")
        console.log(this.baseUrl)
        console.log(post);
        return post
            .map(res => res.json());
    }
}
