import { PaymentFacadeInputDtoInterface, PaymentFacadeOutputDtoInterface } from "./payment.facade.dto";

export default interface PaymentFacadeInterface {
    save(input: PaymentFacadeInputDtoInterface): Promise<PaymentFacadeOutputDtoInterface>;
}
