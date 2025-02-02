export interface CheckoutFacadeInputDtoInterface {
    clientId: string;
    products: {
        productId: string
    }[];
}

export interface CheckoutFacadeOutputDtoInterface {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string
    }[];
}
