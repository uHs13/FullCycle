import BaseEntity from "../../@shared/domain/entity/base.entity";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";

type ItemProperties = {
    id: Uuid;
    name: string;
    price: number;
}

export default class Item extends BaseEntity {
    private _name: string;
    private _price: number;

    constructor(input: ItemProperties) {
        super(input.id);

        this._name = input.name;
        this._price = input.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}
