import UseCaseInterface from "../../@shared/useCase/useCase.interface";
import { FindInvoiceFacadeInputDtoInterface, FindInvoiceFacadeOutputDtoInterface } from "./find/find.invoice.facade.dto.interface";
import { GenerateInvoiceFacadeInputDtoInterface, GenerateInvoiceFacadeOutputDtoInterface } from "./generate/generate.invoice.facade.dto.interface";
import InvoiceFacadeInterface from "./invoice.facade.interface";

type InvoiceFacadeProperties = {
    generateInvoiceUseCase: UseCaseInterface,
    findInvoiceUseCase: UseCaseInterface,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private generateInvoiceUseCase: UseCaseInterface;
    private findInvoiceUseCase: UseCaseInterface;

    constructor(input: InvoiceFacadeProperties) {
        this.generateInvoiceUseCase = input.generateInvoiceUseCase;
        this.findInvoiceUseCase = input.findInvoiceUseCase;
    }

    async generate(input: GenerateInvoiceFacadeInputDtoInterface): Promise<GenerateInvoiceFacadeOutputDtoInterface> {
        return await this.generateInvoiceUseCase.execute(input);
    }

    async find(input: FindInvoiceFacadeInputDtoInterface): Promise<FindInvoiceFacadeOutputDtoInterface> {
        return await this.findInvoiceUseCase.execute(input);
    }
}
