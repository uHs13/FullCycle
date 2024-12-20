import Uuid from "../valueObject/uuid.value.object";

export default class BaseEntity {
    private _id: Uuid;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: Uuid) {
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id(): Uuid {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    changeUpdatedDate(updatedAt: Date): void {
        this._updatedAt = updatedAt;
    }
}
