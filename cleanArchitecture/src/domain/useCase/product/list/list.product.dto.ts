export interface InputListProductDtoInterface {}

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductDtoInterface {
    products: Product[];
}
