import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";

type ProductProperties = {
    id: Uuid
    name: string;
    description: string;
    sellingPrice: number;
};

export default class Product extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _description: string;
    private _sellingPrice: number;

    constructor(input: ProductProperties) {
        super(input.id);

        this._name = input.name;
        this._description = input.description;
        this._sellingPrice = input.sellingPrice;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get sellingPrice(): number {
        return this._sellingPrice;
    }
}
