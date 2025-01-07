import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process.payment.useCase";

describe('Process payment use case unit tests', () => {
    const id = new Uuid();
    const amount = 113;
    const orderId = new Uuid();

    const transaction = new Transaction({
        id: id,
        amount: amount,
        orderId: orderId
    });

    const mockRepository = () => {
        return {
            save: jest.fn().mockReturnValue(Promise.resolve(transaction))
        }
    }

    it('Should properly process a payment', async () => {
        const paymentRepository = mockRepository();
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: orderId,
            amount: amount
        }

        const processedTransaction = await useCase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(processedTransaction.transactionId).toEqual(transaction.id.value);
        expect(processedTransaction.status).toEqual('approved');
        expect(processedTransaction.amount).toEqual(amount);
        expect(processedTransaction.orderId).toEqual(orderId.value);
    });
});
