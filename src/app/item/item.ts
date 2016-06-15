import {Component} from "angular2/core";
import RetroRow from "./retroitem/retrorow";
import {StatusFilterPipe} from "./status-filter-pipe";
import ItemColumn from "./item-column/item-column";

@Component({
    selector: 'item',
    templateUrl: 'app/item/item.html',
    styleUrls: ['styles/retrolist.css'],
    directives: [RetroRow, ItemColumn],
    pipes: [StatusFilterPipe]
})
export default class Item {

    sortByLikes:Boolean = false;
    filterArgs = {status: 'ACTIVE'};

    constructor() {
    }

    switchStatusFilter() {
        this.filterArgs.status = this.getAlternativeStatus();
    }

    getAlternativeStatus() {
        return this.filterArgs.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";
    }

    switchOrderByLikes() {
        this.sortByLikes = !this.sortByLikes;
    }


}
