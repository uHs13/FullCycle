export interface FindClientUseCaseInputDto {
    id: string;
}

export interface FindClientUseCaseOutputDto {
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
