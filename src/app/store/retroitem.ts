export class RetroItem {

    public id:number;

    public board_id:number;

    public message:string;

    public status:string;

    public type:string;

    public creationDate:string;

    public lastModifiedDate:string;

    public likes:number;

    constructor({id, boardId, message, status, type, likes}:
            {id?:number, boardId?:number, message?:string, status?:string, type?:string, likes?:number}) {
        this.id = id;
        this.board_id = boardId;
        this.message = message;
        this.status = status;
        this.type = type;
        this.likes = likes;
    }
}
