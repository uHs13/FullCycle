import { CheckoutFacadeInputDtoInterface, CheckoutFacadeOutputDtoInterface } from "./checkout.facade.dto";

export default interface CheckoutFacadeInterface {
    placeOrder(input: CheckoutFacadeInputDtoInterface): Promise<CheckoutFacadeOutputDtoInterface>;
}
