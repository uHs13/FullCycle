import AggregateRootInterface from "../../@shared/domain/entity/aggregate.root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import Item from "./item";
import AddressValueObject from "./valueObject/address.value.object";

type InvoiceProperties = {
    id: Uuid,
    name: string,
    document: string,
    address: AddressValueObject,
    items: Item[]
}

export default class Invoice extends BaseEntity implements AggregateRootInterface {
    private _name: string;
    private _document: string;
    private _address: AddressValueObject;
    private _items: Item[];

    constructor(input: InvoiceProperties) {
        super(input.id);

        this._name = input.name;
        this._document = input.document;
        this._address = input.address;
        this._items = input.items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): AddressValueObject {
        return this._address;
    }

    get items(): Item[] {
        return this._items;
    }
}
