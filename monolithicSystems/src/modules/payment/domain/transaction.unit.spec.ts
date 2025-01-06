import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import Transaction from "./transaction";

describe('Transaction unit tests', () => {
    it('Should properly create a transaction', () => {
        const uuid = new Uuid();
        const amount = 13;
        const orderId = new Uuid();

        const transactionProperties = {
            id: uuid,
            amount: amount,
            orderId: orderId
        }

        const transaction = new Transaction(transactionProperties);

        expect(transaction.id.value).toEqual(uuid.value);
        expect(transaction.amount).toEqual(amount);
        expect(transaction.orderId.value).toEqual(orderId.value);
    });

    it('Should throw an error when amount is not valid', () => {
        expect(() => {
            const uuid = new Uuid();
            const amount = -13;
            const orderId = new Uuid();

            const transactionProperties = {
                id: uuid,
                amount: amount,
                orderId: orderId
            }

            new Transaction(transactionProperties);
        }).toThrow('The amount must be greater than zero');
    });

    it('Should approve the transaction', () => {
        const uuid = new Uuid();
        const amount = 13;
        const orderId = new Uuid();

        const transactionProperties = {
            id: uuid,
            amount: amount,
            orderId: orderId
        }

        const transaction = new Transaction(transactionProperties);

        expect(transaction.status).toEqual('pending');

        transaction.approve();

        expect(transaction.status).toEqual('approved');
    });

    it('Should deny the transaction', () => {
        const uuid = new Uuid();
        const amount = 13;
        const orderId = new Uuid();

        const transactionProperties = {
            id: uuid,
            amount: amount,
            orderId: orderId
        }

        const transaction = new Transaction(transactionProperties);

        expect(transaction.status).toEqual('pending');

        transaction.deny();

        expect(transaction.status).toEqual('denied');
    });

    it('Should approve the transaction when amount is greater than 100', () => {
        const uuid = new Uuid();
        const amount = 113;
        const orderId = new Uuid();

        const transactionProperties = {
            id: uuid,
            amount: amount,
            orderId: orderId
        }

        const transaction = new Transaction(transactionProperties);

        expect(transaction.status).toEqual('pending');

        transaction.process();

        expect(transaction.status).toEqual('approved');
    });

    it('Should deny the transaction when amount is lower than 100', () => {
        const uuid = new Uuid();
        const amount = 1;
        const orderId = new Uuid();

        const transactionProperties = {
            id: uuid,
            amount: amount,
            orderId: orderId
        }

        const transaction = new Transaction(transactionProperties);

        expect(transaction.status).toEqual('pending');

        transaction.process();

        expect(transaction.status).toEqual('denied');
    });
});
