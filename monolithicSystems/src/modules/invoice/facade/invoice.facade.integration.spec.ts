import { Sequelize } from "sequelize-typescript";
import ItemModel from "../repository/sequelize/model/item.model";
import InvoiceModel from "../repository/sequelize/model/invoice.model";
import Uuid from "../../@shared/domain/valueObject/uuid.value.object";
import ItemsTotalCalculatorService from "../domain/service/items.total.calculator.service";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUseCase from "../useCase/generateInvoiceUseCase/generate.invoice.useCase";
import InvoiceRepository from "../repository/sequelize/invoice.repository";
import FindInvoiceUseCase from "../useCase/findInvoiceUseCase/find.invoice.useCase";

describe('Invoice facade integration tests', () => {
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
        const name = 'name';
        const document = 'document';

        const itemId = new Uuid();
        const itemName = 'name';
        const itemPrice = 13;

        const street = 'street';
        const number = 'number';
        const complement = 'complement';
        const city = 'city';
        const state = 'state';
        const zipCode = 'zipCode';

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
            }],
            calculatorService: new ItemsTotalCalculatorService()
        }

        const invoiceRepository = new InvoiceRepository();

        const facadeInput = {
            generateInvoiceUseCase: new GenerateInvoiceUseCase(invoiceRepository),
            findInvoiceUseCase: new FindInvoiceUseCase(invoiceRepository)
        }

        const facade = new InvoiceFacade(facadeInput);

        const output = await facade.generate(input);

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
        expect(output.items[0].id).toBeDefined();
        expect(output.items[0].name).toEqual(input.items[0].name);
        expect(output.items[0].price).toEqual(input.items[0].price);
    });

    it('Should properly find a invoice', async () => {
        const name = 'name';
        const document = 'document';

        const itemId = new Uuid();
        const itemName = 'name';
        const itemPrice = 13;

        const street = 'street';
        const number = 'number';
        const complement = 'complement';
        const city = 'city';
        const state = 'state';
        const zipCode = 'zipCode';

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
            }],
            calculatorService: new ItemsTotalCalculatorService()
        }

        const invoiceRepository = new InvoiceRepository();

        const facadeInput = {
            generateInvoiceUseCase: new GenerateInvoiceUseCase(invoiceRepository),
            findInvoiceUseCase: new FindInvoiceUseCase(invoiceRepository)
        }

        const facade = new InvoiceFacade(facadeInput);

        const createdInvoice = await facade.generate(input);

        const findInput = {
            id: createdInvoice.id,
            calculatorService: new ItemsTotalCalculatorService()
        };

        const output = await facade.find(findInput);

        expect(output.id).toBeDefined();
        expect(output.name).toEqual(input.name);
        expect(output.document).toEqual(input.document);
        expect(output.address.street).toEqual(input.street);
        expect(output.address.number).toEqual(input.number);
        expect(output.address.complement).toEqual(input.complement);
        expect(output.address.city).toEqual(input.city);
        expect(output.address.state).toEqual(input.state);
        expect(output.address.zipCode).toEqual(input.zipCode);
        expect(output.total).toBe(13);
        expect(output.items.length).toBe(1);
        expect(output.items[0].id).toBeDefined();
        expect(output.items[0].name).toEqual(input.items[0].name);
        expect(output.items[0].price).toEqual(input.items[0].price);
    });
});
