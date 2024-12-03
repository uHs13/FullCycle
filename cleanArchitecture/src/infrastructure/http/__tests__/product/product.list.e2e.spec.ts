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

    it('Should properly list products', async () => {
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

        const listEndpoint = '/product';

        const listResponse = await request(app).get(listEndpoint);

        const expectedOutput = {
            products: [
                {
                    id: createResponse.body.id,
                    name: createResponse.body.name,
                    price: createResponse.body.price,
                }
            ]
        };

        expect(listResponse.status).toEqual(200);
        expect(listResponse.body).toStrictEqual(expectedOutput);
    });
});
