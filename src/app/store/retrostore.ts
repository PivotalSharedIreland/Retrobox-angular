import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {RetroItem} from './retroitem';
import {Board} from "./board";

@Injectable()
export default class RetroStore {
    _http:Http;
    _headers:Headers;
    baseUrl:string = 'http://retrobox-api.cfapps.io';

    constructor(http:Http) {
        this._http = http;
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');

    }

    public getBoard():Observable<Board> {
        return this._http.get(`${this.baseUrl}/board/1`)
            .map(res => res.json());
    }

    public addItem(item:RetroItem):Observable<RetroItem> {
        return this._http.post(`${this.baseUrl}/items`, JSON.stringify(item), {headers: this._headers})
            .map(res => res.json());
    }

    public updateItem(item:RetroItem):Observable<Response> {
        return this._http.put(`${this.baseUrl}/items/${item.id}`, JSON.stringify(item), {headers: this._headers});
    }

    public likeItem(itemId:number):Observable<Response> {
        return this._http.post(`${this.baseUrl}/items/${itemId}/like`, '', {headers: this._headers});
    }

    public deleteItem(itemId:number):Observable<Response> {
        return this._http.delete(`${this.baseUrl}/items/${itemId}`, {headers: this._headers});
    }

}