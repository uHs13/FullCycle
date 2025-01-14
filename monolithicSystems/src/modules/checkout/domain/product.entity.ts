import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";

type ProductProperties = {
    id?: Uuid;
    name: string;
    description: string;
    purchasePrice: number; 
};

export default class Product extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _description: string;
    private _purchasePrice: number;

    constructor(productProperties: ProductProperties) {
        super(productProperties.id);

        this._name = productProperties.name;
        this._description = productProperties.description;
        this._purchasePrice = productProperties.purchasePrice;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get purchasePrice(): number {
        return this._purchasePrice;
    }
}
