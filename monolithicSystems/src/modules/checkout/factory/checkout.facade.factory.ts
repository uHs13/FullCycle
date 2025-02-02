import ClientAdminFacadeFactory from "../../clientAdmin/factory/clientAdmin.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdminFacadeFactory from "../../productAdmin/factory/productAdmin.facade.factory";
import StoreCatalogFacadeFactory from "../../storeCatalog/factory/storeCatalog.facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/sequelize/checkout.repository";
import PlaceOrderUseCase from "../useCase/placeOrder/placeOrder.useCase";

export default class CheckoutFacadeFactory {
    make(): CheckoutFacade {
        const clientAdminFacade = (new ClientAdminFacadeFactory()).make();
        const productAdminFacade = (new ProductAdminFacadeFactory()).make();
        const storeCatalogFacade = (new StoreCatalogFacadeFactory()).make();
        const paymentFacade = (new PaymentFacadeFactory()).make();
        const invoiceFacade = (new InvoiceFacadeFactory()).make();
        const repository = new CheckoutRepository();

        const useCaseInput = {
            clientAdminFacade: clientAdminFacade,
            productAdminFacade: productAdminFacade,
            storeCatalogFacade: storeCatalogFacade,
            paymentFacade: paymentFacade,
            invoiceFacade: invoiceFacade,
            repository: repository,
        };

        const facadeInput = {
            placeOrderUseCase: new PlaceOrderUseCase(useCaseInput),
        }

        const checkoutFacade = new CheckoutFacade(facadeInput);

        return checkoutFacade;
    }
}
