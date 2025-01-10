import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import Item from "../../domain/item";
import GatewayInterface from "../../gateway/invoice.gateway.interface";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find.invoice.useCase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
    private repository: GatewayInterface;

    constructor(repository: GatewayInterface) {
        this.repository = repository;
    }

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        try {
            const foundInvoice = await this.repository.find(input.id);

            return {
                id: foundInvoice.id.value,
                name: foundInvoice.name,
                document: foundInvoice.document,
                address: {
                    street: foundInvoice.address.street,
                    number: foundInvoice.address.number,
                    complement: foundInvoice.address.complement,
                    city: foundInvoice.address.city,
                    state: foundInvoice.address.state,
                    zipCode: foundInvoice.address.zipCode,
                },
                total: input.calculatorService.calculateTotal(foundInvoice.items),
                createdAt: foundInvoice.createdAt,
                items: foundInvoice.items.map((item) => ({
                    id: item.id.value,
                    name: item.name,
                    price: item.price,
                })),
            }
        } catch (error) {
            throw new Error('Was not possible to find the invoice');
        }
    }
}
