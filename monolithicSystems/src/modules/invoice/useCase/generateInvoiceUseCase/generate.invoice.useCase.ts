import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import Invoice from "../../domain/invoice";
import Item from "../../domain/item";
import AddressValueObject from "../../domain/valueObject/address.value.object";
import GatewayInterface from "../../gateway/invoice.gateway.interface";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.invouce.useCase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    private repository: GatewayInterface;

    constructor(repository: GatewayInterface) {
        this.repository = repository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        try {
            const invoice = this.buildInvoice(input);

            const generatedInvoice = await this.repository.generate(invoice);

            return {
                id: generatedInvoice.id.value,
                name: generatedInvoice.name,
                document: generatedInvoice.document,
                street: generatedInvoice.address.street,
                number: generatedInvoice.address.number,
                complement: generatedInvoice.address.complement,
                city: generatedInvoice.address.city,
                state: generatedInvoice.address.state,
                zipCode: generatedInvoice.address.zipCode,
                total: input.calculatorService.calculateTotal(generatedInvoice.items),
                items: generatedInvoice.items.map((item) => ({
                    id: item.id.value,
                    name: item.name,
                    price: item.price,
                }))
            }
        } catch (error) {
            throw new Error('Was not possible to generate the invoice');
        }
    }

    buildInvoice(input: GenerateInvoiceUseCaseInputDto): Invoice {
        const address = new AddressValueObject({
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
        });

        const items = input.items.map((item) => {
            return new Item({
                id: new Uuid(),
                name: item.name,
                price: item.price
            });
        });

        return new Invoice({
            id: new Uuid(),
            name: input.name,
            document: input.document,
            address: address,
            items: items
        });
    }
}
