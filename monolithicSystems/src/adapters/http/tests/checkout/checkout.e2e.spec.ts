import request from "supertest";
import { app, createConnection, migration, sequelize } from "../../express";
import { httpStatusCodes } from "../../routes/routes";

describe('Checkout endpoints end to end tests', () => {
    beforeEach(async () => {
        await createConnection();
    });

    afterEach(async () => {
        await migration.down();
        await sequelize.close();
    });

    it('Should properly place an order', async () => {
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

        expect(placeOrderResponse.status).toBe(httpStatusCodes.created);
        expect(placeOrderResponse.body.id).toBeDefined();
        expect(placeOrderResponse.body.invoiceId).toBeDefined();
        expect(placeOrderResponse.body.status).toEqual('approved');
        expect(placeOrderResponse.body.total).toBeDefined();
        expect(placeOrderResponse.body.products).toEqual([
            {productId: createProductResponse.body.id}
        ]);
    })
});
