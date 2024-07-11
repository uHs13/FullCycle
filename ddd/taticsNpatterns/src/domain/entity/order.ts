import RewardPointsCalculator from "../calculator/rewardPointsCalculator";
import OrderItem from "./orderItem";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number = 0;
    private _rewardPointsCalculator!: RewardPointsCalculator;
    private _rewardPoints: number = 0;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    set rewardPointsCalculator(rewardPointsCalculator: RewardPointsCalculator) {
        this._rewardPointsCalculator = rewardPointsCalculator;
    }

    get total(): number {
        return this._total;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
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
        let total = 0;

        this._items.forEach(orderItem => {
            orderItem.calculateTotal();
            total += orderItem.total;
        });

        this._total = total;
    }

    calculateRewardPoints(): void {
        if (this._total === 0) {
            this._rewardPoints = 0;
        }

        this._rewardPointsCalculator.originAmount = this._total;
        this._rewardPointsCalculator.calculate();

        this._rewardPoints = this._rewardPointsCalculator.total;
    }
}
