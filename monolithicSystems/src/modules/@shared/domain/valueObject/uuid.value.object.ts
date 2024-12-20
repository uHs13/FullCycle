import ValueObjectInterface from "./value.object.interface";
import {v4 as uuidV4} from 'uuid';

export default class Uuid implements ValueObjectInterface {
    private _value: string;

    constructor(value?: string) {
        this._value = value || uuidV4();
    }

    get value(): string {
        return this._value;
    }
}
