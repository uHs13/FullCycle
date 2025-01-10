import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Invoice from "../../domain/invoice";
import Item from "../../domain/item";
import AddressValueObject from "../../domain/valueObject/address.value.object";
import GenerateInvoiceUseCase from "./generate.invoice.useCase";

describe('Generate invoice use case unit test', () => {
    const id = new Uuid();
    const name = 'name';
    const document = 'document';

    const itemId = new Uuid();
    const itemName = 'name';
    const itemPrice = 13;

    const item = new Item({
        id: itemId,
        name: itemName,
        price: itemPrice
    });

    const items = [item];

    const street = 'street';
    const number = 'number';
    const complement = 'complement';
    const city = 'city';
    const state = 'state';
    const zipCode = 'zipCode';

    const address = new AddressValueObject({
        street: street,
        number: number,
        complement: complement,
        city: city,
        state: state,
        zipCode: zipCode
    });

    const invoiceProperties = {
        id: id,
        name: name,
        document: document,
        address: address,
        items: items,
    }

    const invoice = new Invoice(invoiceProperties);

    const mockRepository = () => {
        return {
            generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
            find: jest.fn()
        }
    }

    it('Should properly generate the invoice', async () => {
        const repository = mockRepository();

        const useCase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: name,
            document: document,
            street: street,
            number: number,
            complement: complement,
            city: city,
            state: state,
            zipCode: zipCode,
            items: [{
                id: itemId.value,
                name: itemName,
                price: itemPrice,
            }]
        }

        const output = await useCase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toEqual(input.name);
        expect(output.document).toEqual(input.document);
        expect(output.street).toEqual(input.street);
        expect(output.number).toEqual(input.number);
        expect(output.complement).toEqual(input.complement);
        expect(output.city).toEqual(input.city);
        expect(output.state).toEqual(input.state);
        expect(output.zipCode).toEqual(input.zipCode);
        expect(output.total).toBe(13);
        expect(output.items.length).toBe(1);
        expect(output.items[0].id).toEqual(input.items[0].id);
        expect(output.items[0].name).toEqual(input.items[0].name);
        expect(output.items[0].price).toEqual(input.items[0].price);
    });
});
