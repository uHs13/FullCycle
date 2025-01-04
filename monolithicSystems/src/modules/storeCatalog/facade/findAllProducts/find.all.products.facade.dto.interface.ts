export interface FindAllProductFacadeOutputDtoInterface {
    products: {
        id: string,
        name: string,
        description: string,
        sellingPrice: number,
    }[];
}
