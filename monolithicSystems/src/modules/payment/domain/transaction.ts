import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Uuid from "../../@shared/domain/valueObject/uuid.value.object"

type TransactionProperties = {
    id: Uuid,
    amount: number,
    orderId: Uuid,
}

export default class Transaction extends BaseEntity implements AggregateRootInterface {
    private _amount: number;
    private _orderId: Uuid;
    private _status: string;

    private approvedStatus: string = 'approved';
    private deniedStatus: string = 'denied';
    private pendingStatus: string = 'pending';

    constructor(input: TransactionProperties) {
        super(input.id);

        this._amount = input.amount;
        this._orderId = input.orderId;
        this._status = this.pendingStatus;

        this.validate();
    }

    get amount(): number {
        return this._amount;
    }

    get orderId(): Uuid {
        return this._orderId;
    }

    get status(): string {
        return this._status;
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error('The amount must be greater than zero');
        }
    }

    approve(): void {
        this._status = this.approvedStatus;
    }

    deny(): void {
        this._status = this.deniedStatus;
    }

    process(): void {
        if (this._amount >= 100) {
            this.approve();

            return;
        }

        this.deny();
    }
}
