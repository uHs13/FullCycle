import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _active: boolean = true;
    private _address!: Address;

    constructor(id: string, name: string) {
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
            throw new Error('Id is required');
        }

        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
    }

    changeName(name: string): void {
        this._name = name;

        this.validate();
    }

    activate(): void {
        if (this._address === undefined) {
            throw new Error('To activate the customer you must inform an address');
        }

        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }
}
