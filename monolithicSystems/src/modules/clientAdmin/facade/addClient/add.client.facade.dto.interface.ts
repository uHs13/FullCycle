export interface AddClientFacadeInputDtoInterface {
    name: string,
    document: string;
    email: string,
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface AddClientFacadeOutputDtoInterface {
    id: string,
    name: string,
    document: string;
    email: string,
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}
