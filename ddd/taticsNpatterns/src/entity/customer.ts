import Address from "./address";

class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = true;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }

        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
    }

    set address(address: Address) {
        this._address = address;
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
}
