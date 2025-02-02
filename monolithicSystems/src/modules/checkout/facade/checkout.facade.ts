import UseCaseInterface from "../../@shared/useCase/useCase.interface";
import { CheckoutFacadeInputDtoInterface, CheckoutFacadeOutputDtoInterface } from "./checkout.facade.dto";
import CheckoutFacadeInterface from "./checkout.facade.interface";

type FacadeProperties = {
    placeOrderUseCase: UseCaseInterface
};

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private placeOrderUseCase: UseCaseInterface;

    constructor (input: FacadeProperties) {
        this.placeOrderUseCase = input.placeOrderUseCase;
    }

    placeOrder(input: CheckoutFacadeInputDtoInterface): Promise<CheckoutFacadeOutputDtoInterface> {
        return this.placeOrderUseCase.execute(input);
    }
}
