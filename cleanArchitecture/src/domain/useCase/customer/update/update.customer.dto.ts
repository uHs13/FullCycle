export interface InputUpdateCustomerDtoInterface {
    id: string;
    name: string;
    address: {
        street: string,
        number: number,
        zipCode: string,
        city: string,
    };
};

export interface OutputUpdateCustomerDtoInterface {
    id: string;
    name: string;
    address: {
        street: string,
        number: number,
        zipCode: string,
        city: string,
    };
}
