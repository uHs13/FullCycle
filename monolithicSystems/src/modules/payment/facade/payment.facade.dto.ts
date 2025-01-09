export interface PaymentFacadeInputDtoInterface {
    orderId: string;
    amount: number;
}

export interface PaymentFacadeOutputDtoInterface {
    transactionId: string;
    status: string;
    amount: number;
    orderId: string;
}
