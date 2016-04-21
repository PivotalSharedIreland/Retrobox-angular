import {StatusFilterPipe} from "../statusFilterPipe";
import {RetroItem} from "../../store/retroitem";

describe('StatusFilterPipe', () => {
    it('should return undefined when items are undefined', () => {
        let pipe = new StatusFilterPipe();
        let result = pipe.transform(undefined, []);
        expect(result).toBeUndefined();
    });

    it('should return only the items with the correct status', () => {
        let pipe = new StatusFilterPipe();
        
        let items = [
            new RetroItem({id: 1, status: "ACTIVE"}),
            new RetroItem({id: 2, status: "ACTIVE"}),
            new RetroItem({id: 3, status: "ARCHIVED"}),
            new RetroItem({id: 4, status: "ACTIVE"}),
            new RetroItem({id: 5, status: "ARCHIVED"})
        ];
        
        let activeArgs = [{ status: "ACTIVE" }];
        
        let activeItems = pipe.transform(items, activeArgs);
        expect(activeItems.length).toBe(3);
        expect(activeItems[0].id).toBe(1);
        expect(activeItems[1].id).toBe(2);
        expect(activeItems[2].id).toBe(4);

        let archivedArgs = [{ status: "ARCHIVED" }];

        let archivedItems = pipe.transform(items, archivedArgs);
        expect(archivedItems.length).toBe(2);
        expect(archivedItems[0].id).toBe(3);
        expect(archivedItems[1].id).toBe(5);
    });
});