import Item from "../item";

describe('Item component', () => {
    it('should load the board when created and sort by likes if requested', () => {
        let item = new Item();
        item.switchOrderByLikes();

        expect(item.sortByLikes).toBe(true);
    });


    it('should change the status filter', () => {
        let item = new Item();

        expect(item.filterArgs.status).toBe("ACTIVE");
        item.switchStatusFilter();
        expect(item.filterArgs.status).toBe("ARCHIVED");
        item.switchStatusFilter();
        expect(item.filterArgs.status).toBe("ACTIVE");
    });

});



