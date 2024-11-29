import UuidGeneratorInterface from "../../../@shared/uuid/uuid.generator.interface";

export interface InputCreateCustomerDtoInterface {
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
    },
    uuidGenerator: UuidGeneratorInterface
};

export interface OutputCreateCustomerDtoInterface {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
    }
};
