import { Sequelize } from "sequelize-typescript";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import TransactionModel from "../repository/sequelize/transaction.model";
import PaymentFacadeFactory from "./payment.facade.factory";

describe('Payment facade factory integration tests', () => {
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

    it('Should properly save transaction using factory', async () => {
        const facade = (new PaymentFacadeFactory()).make();

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