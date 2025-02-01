export interface AddClientUseCaseInputDto {
    name: string,
    document: string;
    email: string,
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
};

export interface AddClientUseCaseOutputDto {
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
};
