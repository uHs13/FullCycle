export interface AddProductUseCaseInputDto {
    name: string,
    description: string,
    purchasePrice: number,
    stockAmount: number
};

export interface AddProductUseCaseOutputDto {
    id: string,
    name: string,
    description: string,
    purchasePrice: number,
    stockAmount: number,
    createdAt: Date,
    updatedAt: Date,
};
