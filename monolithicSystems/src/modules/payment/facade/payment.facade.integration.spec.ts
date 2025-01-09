import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/sequelize/transaction.model";
import TransactionRepository from "../repository/sequelize/transaction.repository";
import ProcessPaymentUseCase from "../useCase/processPayment/process.payment.useCase";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import PaymentFacade from "./payment.facade";

describe('Payment facade integration tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it('Should properly save a transaction', async () => {
        const transactionRepository = new TransactionRepository();

        const facadeProperties = {
            processPaymentUseCase: new ProcessPaymentUseCase(transactionRepository)
        }

        const facade = new PaymentFacade(facadeProperties);

        const orderId = new Uuid();
        const amount = 113;

        const input = {
            orderId: orderId.value,
            amount: amount
        }

        const output = await facade.save(input);

        expect(output.transactionId).toBeDefined();
        expect(output.status).toEqual('approved');
        expect(output.amount).toEqual(input.amount);
        expect(output.orderId).toEqual(input.orderId);
    });
});
