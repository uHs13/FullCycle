import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Invoice from "../../domain/invoice";
import Item from "../../domain/item";
import ItemsTotalCalculatorService from "../../domain/service/items.total.calculator.service";
import AddressValueObject from "../../domain/valueObject/address.value.object";
import FindInvoiceUseCase from "./find.invoice.useCase";

describe('Find invoice use case unit test', () => {
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
            generate: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(invoice))
        }
    }

    it('Should properly find the invoice', async () => {
        const repository = mockRepository();

        const useCase = new FindInvoiceUseCase(repository);

        const input = {
            id: invoice.id.value,
            calculatorService: new ItemsTotalCalculatorService()
        };

        const output = await useCase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(output.id).toEqual(input.id);
        expect(output.name).toEqual(invoice.name);
        expect(output.document).toEqual(invoice.document);
        expect(output.address.street).toEqual(invoice.address.street);
        expect(output.address.number).toEqual(invoice.address.number);
        expect(output.address.complement).toEqual(invoice.address.complement);
        expect(output.address.city).toEqual(invoice.address.city);
        expect(output.address.state).toEqual(invoice.address.state);
        expect(output.address.zipCode).toEqual(invoice.address.zipCode);
        expect(output.total).toBe(13);
        expect(output.items.length).toBe(1);
        expect(output.items[0].id).toEqual(invoice.items[0].id.value);
        expect(output.items[0].name).toEqual(invoice.items[0].name);
        expect(output.items[0].price).toEqual(invoice.items[0].price);
    });
});
