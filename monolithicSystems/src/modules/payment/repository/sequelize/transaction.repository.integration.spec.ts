import { Sequelize } from "sequelize-typescript";
import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Transaction from "../../domain/transaction";
import TransactionRepository from "./transaction.repository";
import TransactionModel from "./transaction.model";

describe('Transaction repository integration tests', () => {
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

    it('Should properly create a transaction', async () => {
        const uuid = new Uuid();
        const amount = 113;
        const orderId = new Uuid();

        const transaction = new Transaction({
            id: uuid,
            amount: amount,
            orderId: orderId
        });

        const transactionRepository = new TransactionRepository();

        const createdTransaction = await transactionRepository.save(transaction);

        expect(createdTransaction.id.value).toEqual(transaction.id.value);
        expect(createdTransaction.amount).toEqual(transaction.amount);
        expect(createdTransaction.orderId).toEqual(transaction.orderId);
    });
});
