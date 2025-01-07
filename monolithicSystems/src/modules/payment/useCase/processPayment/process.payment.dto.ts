import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";

export interface ProcessPaymentInputDto {
    orderId: Uuid;
    amount: number;
}

export interface ProcessPaymentOutputDto {
    transactionId: string;
    status: string;
    amount: number;
    orderId: string;
}
