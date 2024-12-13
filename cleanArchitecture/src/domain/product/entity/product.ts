import Entity from "../../@shared/entity/entity.abstract";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
    private _id: string;
    private _name: string;
    private _price: number;
    public errorContext: string = 'Product';

    constructor (id: string, name: string, price: number) {
        super();

        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    validate(): void {
        ProductValidatorFactory.create().validate(this);
    }

    changeName(name: string): void {
        this._name = name;

        this.validate();
    }

    changePrice(price: number): void {
        this._price = price;

        this.validate();
    }
}
