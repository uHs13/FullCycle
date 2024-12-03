import {app, sequelize} from "../../express"
import request from "supertest";
import { httpStatusCodes } from "../../routes/routes";

describe('Create product http endpoint end to end tests', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should properly create a product', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const endpoint = "/product";

        const response = await request(app)
            .post(endpoint)
            .send({
                name: name,
                price: price
            })
        ;

        const expectedOutput = {
            id: response.body.id,
            name: name,
            price: price,
        };

        expect(response.status).toEqual(httpStatusCodes.created);
        expect(response.body).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when the request is missing data', async () => {
        const endpoint = '/product';

        const response = await request(app)
            .post(endpoint)
            .send({
                name: 'Black Shoes',
            })
        ;

        expect(response.status).toBe(500);
    });

    it('Should throw an error when name is not valid', async () => {
        const name = '';
        const price = 13;

        const endpoint = "/product";

        const response = await request(app)
            .post(endpoint)
            .send({
                name: name,
                price: price
            });
        ;

        expect(response.status).toEqual(httpStatusCodes.internalServerError);
        expect(response.body.error).toStrictEqual('The name is required');
    });

    it('Should throw an error when price is not valid', async () => {
        const name = 'Black Shoes';
        const price = -13;

        const endpoint = "/product";

        const response = await request(app)
            .post(endpoint)
            .send({
                name: name,
                price: price
            });
        ;

        expect(response.status).toEqual(httpStatusCodes.internalServerError);
        expect(response.body.error).toStrictEqual('The price must be greater or equal to zero');
    });
});
