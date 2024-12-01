import UuidGeneratorInterface from "../../../@shared/uuid/uuid.generator.interface";

export interface InputCreateProductDtoInterface {
    name: string,
    price: number,
    uuidGenerator: UuidGeneratorInterface,
};

export interface OutputCreateProductDtoInterface {
    id: string,
    name: string,
    price: number,
}
