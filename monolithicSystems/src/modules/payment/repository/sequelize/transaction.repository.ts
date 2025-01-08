import Transaction from "../../domain/transaction";
import PaymentGatewayInterface from "../../gateway/payment.gateway.interface";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGatewayInterface {
    async save(input: Transaction): Promise<Transaction> {
        try {
            await TransactionModel.create({
                id: input.id.value,
                amount: input.amount,
                orderId: input.orderId.value,
                status: input.status
            });

            return input;
        } catch (error) {
            throw new Error('Was not possible to create the transaction');
        }
    }
}
