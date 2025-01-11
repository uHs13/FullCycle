import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/sequelize/invoice.repository";
import FindInvoiceUseCase from "../useCase/findInvoiceUseCase/find.invoice.useCase";
import GenerateInvoiceUseCase from "../useCase/generateInvoiceUseCase/generate.invoice.useCase";

export default class InvoiceFacadeFactory {
    make(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository();

        const facadeInput = {
            generateInvoiceUseCase: new GenerateInvoiceUseCase(invoiceRepository),
            findInvoiceUseCase: new FindInvoiceUseCase(invoiceRepository)
        }

        return new InvoiceFacade(facadeInput);
    }
}
