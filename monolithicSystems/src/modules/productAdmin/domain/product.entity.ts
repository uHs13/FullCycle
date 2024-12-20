import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";

type ProductProperties = {
    id: Uuid;
    name: string;
    description: string;
    purchasePrice: number;
    stockAmount: number;
};

export default class Product extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _description: string;
    private _purchasePrice: number;
    private _stockAmount: number;

    constructor(productProperties: ProductProperties) {
        super(productProperties.id);

        this._name = productProperties.name;
        this._description = productProperties.description;
        this._purchasePrice = productProperties.purchasePrice;
        this._stockAmount = productProperties.stockAmount;
    }

    set name(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set description(description: string) {
        this._description = description;
    }

    get description(): string {
        return this._description;
    }

    set purchasePrice(purchasePrice: number) {
        this._purchasePrice = purchasePrice;
    }

    get purchasePrice(): number {
        return this._purchasePrice;
    }

    set stockAmount(stockAmount: number) {
        this._stockAmount = stockAmount;
    }

    get stockAmount(): number {
        return this._stockAmount;
    }
}
