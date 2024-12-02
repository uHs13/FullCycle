import {app, sequelize} from "../../express"
import request from "supertest";

describe('Find customer http endpoint end to end tests', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should properly find a customer', async () => {
        const createEndpoint = '/customer';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const createResponse = await request(app)
            .post(createEndpoint)
            .send({
                name: name,
                address: {
                    street: street,
                    number: number,
                    zipCode: zipCode,
                    city: city
                }
            })
        ;

        const findEndpoint = `/customer/${createResponse.body.id}`;

        const findResponse = await request(app).get(findEndpoint);

        const expectedOutput = {
            id: createResponse.body.id,
            name: createResponse.body.name,
            address: {
                street: createResponse.body.address.street,
                number: createResponse.body.address.number,
                zipCode: createResponse.body.address.zipCode,
                city: createResponse.body.address.city
            }
        };

        expect(findResponse.status).toStrictEqual(200);
        expect(findResponse.body).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when customer does not exist', async () => {
        const findEndpoint = `/customer/invalid-uuid`;

        const findResponse = await request(app).get(findEndpoint);

        expect(findResponse.status).toStrictEqual(500);
        expect(findResponse.body.error).toStrictEqual('Customer not found');
    });
});
