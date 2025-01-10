import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Item from "../item";
import ItemsTotalCalculatorService from "./items.total.calculator.service";

describe('Items total calculator service unit test', () => {
    it('Should properly calculate the invoice total', () => {
        const itemOne = new Item({
            id: new Uuid(),
            name: 'name',
            price: 7
        });

        const itemTwo = new Item({
            id: new Uuid(),
            name: 'name two',
            price: 6
        });

        const items = [itemOne, itemTwo];
        const service = new ItemsTotalCalculatorService();

        const result = service.calculateTotal(items);

        expect(result).toEqual(13);
    });
});
