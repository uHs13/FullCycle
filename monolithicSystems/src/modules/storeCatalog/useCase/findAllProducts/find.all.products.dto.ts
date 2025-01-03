export interface FindAllProductsDtoInput {

};

export interface FindAllProductsDtoOutput {
    products: {
        id: string;
        name: string;
        description: string;
        sellingPrice: number;
    }[];
}
