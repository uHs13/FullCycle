import {app, sequelize} from "../../express"
import request from "supertest";

describe('List customer http endpoint end to end tests', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should list all customers', async () => {
        const createEndpoint = '/customer';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const output = await request(app)
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

        const ListEndpoint = "/customer";

        const response = await request(app).get(ListEndpoint);

        const expectedOutput = {
            customers: [
                {
                    id: output.body.id,
                    name: name,
                    address: {
                        street: street,
                        number: number,
                        zipCode: zipCode,
                        city: city,
                    }
                }
            ]
        };

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expectedOutput);
    });

    it('Should list all customers in XML format', async () => {
        const createEndpoint = '/customer';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const output = await request(app)
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

        const ListEndpoint = "/customer";

        const response = await request(app)
            .get(ListEndpoint)
            .set('Accept', 'application/XML')
            .send()
        ;

        expect(response.status).toBe(200);
        expect(response.text).toContain(`<?xml version="1.0" encoding="UTF-8"`);
    });
});
