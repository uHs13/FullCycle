import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProperties = {
    id: Uuid;
    client: Client;
    products: Product[];
    status?: string;
}

export default class OrderEntity extends BaseEntity implements AggregateRootInterface {
    private pendingStatus = 'pending';
    private approvedStatus = 'approved';

    private _client: Client;
    private _products: Product[];
    private _status: string;

    constructor(input: OrderProperties) {
        super(input.id);

        this._client = input.client;
        this._products = input.products;
        this._status = input.status || this.pendingStatus;
    }

    get client(): Client {
        return this._client;
    }

    get products(): Product[] {
        return this._products;
    }

    get status(): string {
        return this._status;
    }

    approve(): void {
        this._status = this.approvedStatus;
    }

    calculateTotal(): number {
        return this._products.reduce((total, current) => {
            return total + current.purchasePrice;
        }, 0);
    }
}
