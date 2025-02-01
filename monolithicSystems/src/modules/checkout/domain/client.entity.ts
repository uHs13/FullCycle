import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";

type ClientProperties = {
    id?: Uuid;
    name: string;
    document: string;
    email: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Client extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _document: string;
    private _email: string;
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(input: ClientProperties) {
        super(input.id);

        this._name = input.name;
        this._document = input.document 
        this._email = input.email
        this._street = input.street;
        this._number = input.number;
        this._complement = input.street;
        this._city = input.city;
        this._state = input.street;
        this._zipCode = input.street;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get email(): string {
        return this._email;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }
}
