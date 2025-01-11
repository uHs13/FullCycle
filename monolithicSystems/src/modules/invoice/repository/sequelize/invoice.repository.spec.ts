import { Sequelize } from "sequelize-typescript";
import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Invoice from "../../domain/invoice";
import Item from "../../domain/item";
import AddressValueObject from "../../domain/valueObject/address.value.object";
import ItemModel from "./model/item.model";
import InvoiceModel from "./model/invoice.model";
import InvoiceRepository from "./invoice.repository";

describe('Invoice repository integration test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ItemModel, InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it('Should properly generate a invoice', async () => {
        const invoiceRepository = new InvoiceRepository();

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

        const generatedInvoice = await invoiceRepository.generate(invoice);

        expect(generatedInvoice.id).toBeDefined();
        expect(generatedInvoice.name).toEqual(invoice.name);
        expect(generatedInvoice.document).toEqual(invoice.document);
        expect(generatedInvoice.address.street).toEqual(invoice.address.street);
        expect(generatedInvoice.address.number).toEqual(invoice.address.number);
        expect(generatedInvoice.address.complement).toEqual(invoice.address.complement);
        expect(generatedInvoice.address.city).toEqual(invoice.address.city);
        expect(generatedInvoice.address.state).toEqual(invoice.address.state);
        expect(generatedInvoice.address.zipCode).toEqual(invoice.address.zipCode);
        expect(generatedInvoice.items.length).toBe(1);
        expect(generatedInvoice.items[0].id).toEqual(invoice.items[0].id);
        expect(generatedInvoice.items[0].name).toEqual(invoice.items[0].name);
        expect(generatedInvoice.items[0].price).toEqual(invoice.items[0].price);
    });

    it('Should properly find a invoice', async () => {
        const invoiceRepository = new InvoiceRepository();

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

        await invoiceRepository.generate(invoice);

        const foundInvoice = await invoiceRepository.find(invoice.id.value);

        expect(foundInvoice.id).toBeDefined();
        expect(foundInvoice.name).toEqual(invoice.name);
        expect(foundInvoice.document).toEqual(invoice.document);
        expect(foundInvoice.address.street).toEqual(invoice.address.street);
        expect(foundInvoice.address.number).toEqual(invoice.address.number);
        expect(foundInvoice.address.complement).toEqual(invoice.address.complement);
        expect(foundInvoice.address.city).toEqual(invoice.address.city);
        expect(foundInvoice.address.state).toEqual(invoice.address.state);
        expect(foundInvoice.address.zipCode).toEqual(invoice.address.zipCode);
        expect(foundInvoice.items.length).toBe(1);
        expect(foundInvoice.items[0].id).toEqual(invoice.items[0].id);
        expect(foundInvoice.items[0].name).toEqual(invoice.items[0].name);
        expect(foundInvoice.items[0].price).toEqual(invoice.items[0].price);
    });
});
