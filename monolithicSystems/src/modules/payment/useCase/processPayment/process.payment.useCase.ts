import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import Transaction from "../../domain/transaction";
import PaymentGatewayInterface from "../../gateway/payment.gateway.interface";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process.payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    private repository: PaymentGatewayInterface;

    constructor(repository: PaymentGatewayInterface) {
        this.repository = repository;
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        try {
            const transaction = new Transaction({
                id: new Uuid(),
                orderId: input.orderId,
                amount: input.amount
            });

            transaction.process();

            const persistedTransaction = await this.repository.save(transaction);

            return {
                transactionId: persistedTransaction.id.value,
                status: transaction.status,
                amount: persistedTransaction.amount,
                orderId: persistedTransaction.orderId.value,
            }
        } catch (error) {
            throw new Error('Was not possible to process the transaction');
        }
    }
}
