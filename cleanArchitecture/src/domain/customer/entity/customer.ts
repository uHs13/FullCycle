import Entity from "../../@shared/entity/entity.abstract";
import Address from "../valueObject/address";

export default class Customer extends Entity {
    private _id: string;
    private _name: string;
    private _active: boolean = true;
    private _address!: Address;
    private _errorContext: string = 'Customer';

    constructor(id: string, name: string) {
        super();

        this._id = id;
        this._name = name;

        this.validate();
    }

    set address(address: Address) {
        this._address = address;
    }

    set active(active: boolean) {
        this._active = active;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                context: this._errorContext,
                message: 'Id is required'
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                context: this._errorContext,
                message: 'Name is required'
            });
        }

        this.throwErrors();
    }

    changeName(name: string): void {
        this._name = name;

        this.validate();
    }

    activate(): void {
        if (this._address === undefined) {
            this.notification.addError({
                context: this._errorContext,
                message: 'To activate the customer you must inform an address'
            });
        }

        this.throwErrors();

        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }
}
