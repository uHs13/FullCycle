import OrderItem from "./orderItem";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number = 0;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;

        this.validate();
    }

    get total(): number {
        return this._total;
    }

    validate(): void {
        if (this._id.length === 0) {
            throw new Error('The id is required');
        }

        if (this._customerId.length === 0) {
            throw new Error('The customer id is required');
        }

        if (this._items.length === 0) {
            throw new Error('Its mandatory to inform the order items');
        }
    }

    calculateTotal(): void {
        this._total = this._items.reduce((sum, item) => sum + item.price, 0);
    }
}
