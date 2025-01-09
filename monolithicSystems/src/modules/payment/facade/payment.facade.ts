import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import UseCaseInterface from "../../@shared/useCase/useCase.interface"
import Transaction from "../domain/transaction";
import { PaymentFacadeInputDtoInterface, PaymentFacadeOutputDtoInterface } from "./payment.facade.dto";
import PaymentFacadeInterface from "./payment.facade.interface";

type FacadeProperties = {
    processPaymentUseCase: UseCaseInterface
}

export default class PaymentFacade implements PaymentFacadeInterface {
    private processPaymentUseCase: UseCaseInterface;

    constructor(facadeProperties: FacadeProperties) {
        this.processPaymentUseCase = facadeProperties.processPaymentUseCase;
    }

    async save(input: PaymentFacadeInputDtoInterface): Promise<PaymentFacadeOutputDtoInterface> {
        const transaction = new Transaction({
            id: new Uuid(),
            amount: input.amount,
            orderId: new Uuid(input.orderId)
        });

        return await this.processPaymentUseCase.execute(transaction);
    }
}
