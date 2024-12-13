import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
    private _id: string;
    private _name: string;
    private _price: number;
    private _errorContext: string = 'Product';

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
        if (this._id.length === 0) {
            this.notification.addError({
                context: this._errorContext,
                message: 'The id is required'
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                context: this._errorContext,
                message: 'The name is required'
            });
        }

        if (this._price < 0) {
            this.notification.addError({
                context: this._errorContext,
                message: 'The price must be greater or equal to zero'
            });
        }

        this.throwErrors();
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
