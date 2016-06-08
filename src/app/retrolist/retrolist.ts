import {Component, Inject} from 'angular2/core';
import RetroColumn from "./retrocolumn/retrocolumn";

@Component({
    selector: 'retro-list',
    templateUrl: 'app/retrolist/retrolist.html',
    styleUrls: ['styles/retrolist.css'],
    directives: [RetroColumn]
})
export default class RetroList {
    filterArgs = {status: 'ACTIVE'};
    sortByLikes:Boolean = false;


    constructor() {
    }


    switchOrderByLikes() {
        this.sortByLikes = !this.sortByLikes;
    }   

    switchStatusFilter() {
        this.filterArgs.status = this.getAlternativeStatus();
    }

    private getAlternativeStatus() {
        return this.filterArgs.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";
    }

}
