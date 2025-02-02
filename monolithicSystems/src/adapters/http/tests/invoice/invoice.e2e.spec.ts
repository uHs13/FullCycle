import request from "supertest";
import { app, createConnection, migration, sequelize } from "../../express";
import { httpStatusCodes } from "../../routes/routes";

describe('Invoice endpoints end to end tests', () => {
    beforeEach(async () => {
        await createConnection();
    });

    afterEach(async () => {
        await migration.down();
        await sequelize.close();
    });

    it('Should properly find an invoice', async () => {
        const name = 'John Cena';
        const document = "12345";
        const email = "john.cena@email.com";
        const street = "groove";
        const number = "13";
        const complement = "A";
        const city = "Los Santos";
        const state = "SA";
        const zipCode = "968574";

        const endpoint = '/client';

        const createClientResponse = await request(app)
            .post(endpoint)
            .send({
                name: name,
                document: document,
                email: email,
                street: street,
                number: number,
                complement: complement,
                city: city,
                state: state,
                zipCode: zipCode,
            })
        ;

        const productName = 'Black and White T-shirt';
        const description = 'Light and beauty T-shirt';
        const purchasePrice = 13;
        const stockAmount = 13;

        const createProductEndpoint = '/product';

        const createProductResponse = await request(app)
            .post(createProductEndpoint)
            .send({
                name: productName,
                description: description,
                purchasePrice: purchasePrice,
                stockAmount: stockAmount
            })
        ;

        const placeOrderEndpoint = '/checkout';

        const placeOrderResponse = await request(app)
            .post(placeOrderEndpoint)
            .send({
                clientId: createClientResponse.body.id,
                products: [
                    {
                        productId: createProductResponse.body.id
                    }
                ]
            })
        ;

        const findInvoiceEndpoint = `/invoice?id=${placeOrderResponse.body.invoiceId}`;

        const findInvoiceResponse = await request(app)
            .get(findInvoiceEndpoint)
            .send({
                clientId: createClientResponse.body.id,
                products: [
                    {
                        productId: createProductResponse.body.id
                    }
                ]
            })
        ;

        expect(findInvoiceResponse.status).toBe(httpStatusCodes.ok);
        expect(findInvoiceResponse.body.id).toBeDefined();
        expect(findInvoiceResponse.body.name).toEqual(createClientResponse.body.name);
        expect(findInvoiceResponse.body.address).toEqual({
            street: createClientResponse.body.street,
            number: createClientResponse.body.number,
            complement: createClientResponse.body.street,
            city: createClientResponse.body.city,
            state: createClientResponse.body.street,
            zipCode: createClientResponse.body.street,
        });
        expect(findInvoiceResponse.body.total).toBeDefined();
        expect(findInvoiceResponse.body.items).toBeDefined();
    });
});
