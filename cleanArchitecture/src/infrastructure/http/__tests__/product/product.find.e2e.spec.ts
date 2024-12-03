import {app, sequelize} from "../../express"
import request from "supertest";
import { httpStatusCodes } from "../../routes/routes";

describe('Find product http endpoint end to end tests', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should properly find a product', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const createEndpoint = "/product";

        const createResponse = await request(app)
            .post(createEndpoint)
            .send({
                name: name,
                price: price
            })
        ;

        const findEndpoint = `/product/${createResponse.body.id}`;

        const findResponse = await request(app).get(findEndpoint);

        const expectedOutput = {
            id: createResponse.body.id,
            name: createResponse.body.name,
            price: createResponse.body.price,
        };

        expect(findResponse.status).toEqual(httpStatusCodes.ok);
        expect(findResponse.body).toStrictEqual(expectedOutput);
    });
});
