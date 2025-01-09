import PaymentFacade from "../facade/payment.facade";
import PaymentFacadeInterface from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/sequelize/transaction.repository";
import ProcessPaymentUseCase from "../useCase/processPayment/process.payment.useCase";

export default class PaymentFacadeFactory {
    make(): PaymentFacadeInterface {
        const transactionRepository = new TransactionRepository();

        const facadeProperties = {
            processPaymentUseCase: new ProcessPaymentUseCase(transactionRepository)
        }

        return new PaymentFacade(facadeProperties);
    }
}