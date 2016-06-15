import {Pipe, Injectable, PipeTransform} from "angular2/core";
import {RetroItem} from "../store/retroitem";

@Pipe({
    name: 'statusFilter',
    pure: false
})
@Injectable()
export class StatusFilterPipe implements PipeTransform {
    transform(items: RetroItem[], args: any[]): any {
        if (items === undefined) return items;
        return items.filter(item => item.status === args[0].status);
    }
}
