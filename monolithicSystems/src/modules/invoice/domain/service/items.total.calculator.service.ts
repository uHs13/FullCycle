import Item from "../item";

export default class ItemsTotalCalculatorService {
    calculateTotal(items: Item[]): number {
        let invoiceTotal = 0;

        items.forEach(item => {
            invoiceTotal += item.price;
        });

        return invoiceTotal;
    }
}
