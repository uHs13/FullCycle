import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import Invoice from "./invoice";
import Item from "./item";
import AddressValueObject from "./valueObject/address.value.object";

describe('Invoice unit tests', () => {
    it('Should properly create a invoice', async () => {
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

        expect(invoice.id.value).toEqual(invoiceProperties.id.value);
        expect(invoice.name).toEqual(invoiceProperties.name);
        expect(invoice.document).toEqual(invoiceProperties.document);
        expect(invoice.address).toEqual(invoiceProperties.address);
        expect(invoice.items).toEqual(invoiceProperties.items);
    });
});
