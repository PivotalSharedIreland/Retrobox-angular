export class RetroItem {

    private _id:number;

    private _boardId:number;

    private _message:string;

    private _status:string;

    private _type:string;

    private _creationDate:string;

    private _lastModifiedDate:string;

    private _likes:number;

    constructor(id?:number, boardId?:number, message?:string, status?:string, type?:string, likes?:number) {
        this._id = id;
        this._boardId = boardId;
        this._message = message;
        this._status = status;
        this._type = type;
        this._likes = likes;
    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get boardId():number {
        return this._boardId;
    }

    set boardId(value:number) {
        this._boardId = value;
    }

    get message():string {
        return this._message;
    }

    setMessage(value:string) {
        this._message = value;
        return this;
    }

    get status():string {
        return this._status;
    }

    setStatus(value:string) {
        this._status = value;
        return this;
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
    }

    get creationDate():string {
        return this._creationDate;
    }

    set creationDate(value:string) {
        this._creationDate = value;
    }

    get lastModifiedDate():string {
        return this._lastModifiedDate;
    }

    set lastModifiedDate(value:string) {
        this._lastModifiedDate = value;
    }

    get likes():number {
        return this._likes;
    }

    set likes(value:number) {
        this._likes = value;
    }
}
