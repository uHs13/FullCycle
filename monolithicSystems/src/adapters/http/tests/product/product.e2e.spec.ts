import request from "supertest";
import { app, createConnection, migration, sequelize } from "../../express";
import { httpStatusCodes } from "../../routes/routes";

describe('Product endpoints end to end tests', () => {
    beforeEach(async () => {
        await createConnection();
    });

    afterEach(async () => {
        await migration.down();
        await sequelize.close();
    });

    it('Should properly create a product', async () => {
        const name = 'Black and White T-shirt';
        const description = 'Light and beauty T-shirt';
        const purchasePrice = 13;
        const stockAmount = 13;

        const endpoint = '/product';

        const response = await request(app)
            .post(endpoint)
            .send({
                name: name,
                description: description,
                purchasePrice: purchasePrice,
                stockAmount: stockAmount
            })
        ;

        expect(response.status).toEqual(httpStatusCodes.created);
        expect(response.body.name).toEqual(name);
        expect(response.body.description).toEqual(description);
        expect(response.body.purchasePrice).toEqual(purchasePrice);
        expect(response.body.stockAmount).toEqual(stockAmount);
    });

    it('Should properly get a product stock amount', async () => {
        const name = 'Black and White T-shirt';
        const description = 'Light and beauty T-shirt';
        const purchasePrice = 13;
        const stockAmount = 13;

        const createProductEndpoint = '/product';

        const response = await request(app)
            .post(createProductEndpoint)
            .send({
                name: name,
                description: description,
                purchasePrice: purchasePrice,
                stockAmount: stockAmount
            })
        ;

        const getProductEndpoint = `/product/stockAmount?id=${response.body.id}`;

        const responseGetProduct = await request(app)
            .get(getProductEndpoint)
            .send()
        ;

        expect(responseGetProduct.status).toEqual(httpStatusCodes.ok);
        expect(response.body.id).toEqual(response.body.id);
        expect(response.body.stockAmount).toEqual(response.body.stockAmount);
    });

    it('Should properly get a product', async () => {
        const name = 'Black and White T-shirt';
        const description = 'Light and beauty T-shirt';
        const purchasePrice = 13;
        const stockAmount = 13;

        const createProductEndpoint = '/product';

        const response = await request(app)
            .post(createProductEndpoint)
            .send({
                name: name,
                description: description,
                purchasePrice: purchasePrice,
                stockAmount: stockAmount
            })
        ;

        const getProductEndpoint = `/product?id=${response.body.id}`;

        const responseGetProduct = await request(app)
            .get(getProductEndpoint)
            .send()
        ;

        expect(responseGetProduct.status).toEqual(httpStatusCodes.ok);
        expect(response.body.id).toEqual(response.body.id);
        expect(response.body.name).toEqual(response.body.name);
        expect(response.body.description).toEqual(response.body.description);
    });

    it('Should properly get all products', async () => {
        const name = 'Black and White T-shirt';
        const description = 'Light and beauty T-shirt';
        const purchasePrice = 13;
        const stockAmount = 13;

        const createProductEndpoint = '/product';

        const response = await request(app)
            .post(createProductEndpoint)
            .send({
                name: name,
                description: description,
                purchasePrice: purchasePrice,
                stockAmount: stockAmount
            })
        ;

        const getProductsEndpoint = `/product/all`;

        const responseGetProduct = await request(app)
            .get(getProductsEndpoint)
            .send()
        ;

        expect(responseGetProduct.status).toEqual(httpStatusCodes.ok);
        expect(responseGetProduct.body).toEqual({
            products: [
                {
                    id: response.body.id,
                    name: response.body.name,
                    description: response.body.description,
                    sellingPrice: null
                }
            ]
        });
    });
});
