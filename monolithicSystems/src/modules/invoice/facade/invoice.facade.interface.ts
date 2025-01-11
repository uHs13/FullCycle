import { FindInvoiceFacadeInputDtoInterface, FindInvoiceFacadeOutputDtoInterface } from "./find/find.invoice.facade.dto.interface";
import { GenerateInvoiceFacadeInputDtoInterface, GenerateInvoiceFacadeOutputDtoInterface } from "./generate/generate.invoice.facade.dto.interface";

export default interface InvoiceFacadeInterface {
    generate(input: GenerateInvoiceFacadeInputDtoInterface): Promise<GenerateInvoiceFacadeOutputDtoInterface>;
    find(input: FindInvoiceFacadeInputDtoInterface): Promise<FindInvoiceFacadeOutputDtoInterface>;
}
