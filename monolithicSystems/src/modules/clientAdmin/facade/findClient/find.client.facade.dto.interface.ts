export interface FindClientFacadeInputDtoInterface {
    id: string
}

export interface FindClientFacadeOutputDtoInterface {
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
