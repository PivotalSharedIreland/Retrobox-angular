export class Action {

    public id:number;
    public boardId: number;
    public description:string;
    public owner:string;
    public status:string;
    public creationDate:string;
    public lastModifiedDate:string;

    constructor({id, boardId, description, owner, status, creationDate, lastModifiedDate}:
        {id?:number, boardId?:number,  description?:string, owner?:string, status?:string, creationDate?:string, lastModifiedDate?:string}) {
        this.id = id;
        this.boardId = boardId;
        this.description = description;
        this.owner = owner;
        this.status = status;
        this.creationDate = creationDate;
        this.lastModifiedDate = lastModifiedDate;
    }
}
