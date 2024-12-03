import {app, sequelize} from "../../express"
import request from "supertest";
import { httpStatusCodes } from "../../routes/routes";

describe('List product http endpoint end to end tests', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should properly update a product', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const createEndpoint = '/product';

        const createResponse = await request(app)
            .post(createEndpoint)
            .send({
                name: name,
                price: price
            })
        ;

        const updateEndpoint = `/product/${createResponse.body.id}`;

        const updatedName = 'Black and White Shoes';

        const updateResponse = await request(app)
            .put(updateEndpoint)
            .send({
                id: createResponse.body.id,
                name: updatedName,
                price: createResponse.body.price,
            })
        ;

        const expectedOutut = {
            id: createResponse.body.id,
            name: updatedName,
            price: createResponse.body.price
        };

        expect(updateResponse.status).toEqual(200);
        expect(updateResponse.body).toStrictEqual(expectedOutut);
    });

    it('Should throw an error when data is missing', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const createEndpoint = '/product';

        const createResponse = await request(app)
            .post(createEndpoint)
            .send({
                name: name,
                price: price
            })
        ;

        const updateEndpoint = `/product/${createResponse.body.id}`;

        const updateResponse = await request(app)
            .put(updateEndpoint)
            .send({
                price: createResponse.body.price,
            })
        ;

        expect(updateResponse.status).toEqual(500);
    });


    it('Should throw an error when name is invalid', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const createEndpoint = '/product';

        const createResponse = await request(app)
            .post(createEndpoint)
            .send({
                name: name,
                price: price
            })
        ;

        const updateEndpoint = `/product/${createResponse.body.id}`;

        const updatedName = '';

        const updateResponse = await request(app)
            .put(updateEndpoint)
            .send({
                id: createResponse.body.id,
                name: updatedName,
                price: createResponse.body.price,
            })
        ;

        expect(updateResponse.status).toEqual(500);
        expect(updateResponse.body.error).toStrictEqual('The name is required');
    });

    it('Should throw an error when price is invalid', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const createEndpoint = '/product';

        const createResponse = await request(app)
            .post(createEndpoint)
            .send({
                name: name,
                price: price
            })
        ;

        const updateEndpoint = `/product/${createResponse.body.id}`;

        const updatedName = 'Black and White Shoes';
        const updatedPrice = -13;

        const updateResponse = await request(app)
            .put(updateEndpoint)
            .send({
                id: createResponse.body.id,
                name: updatedName,
                price: updatedPrice,
            })
        ;

        expect(updateResponse.status).toEqual(500);
        expect(updateResponse.body.error).toStrictEqual('The price must be greater or equal to zero');
    });
});
