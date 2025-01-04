import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";

type ClientProperties = {
    id: Uuid,
    name: string,
    email: string,
    address: string,
};

export default class ClientEntity extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(input: ClientProperties) {
        super(input.id);

        this._name = input.name;
        this._email = input.email;
        this._address = input.address;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get address(): string {
        return this._address;
    }
}
