import request from "supertest";
import { app, createConnection, migration, sequelize } from "../../express";
import { httpStatusCodes } from "../../routes/routes";

describe('Client endpoints end to end tests', () => {
    beforeEach(async () => {
        await createConnection();
    });

    afterEach(async () => {
        await migration.down();
        await sequelize.close();
    });

    it('Should properly create a client', async () => {
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

        const response = await request(app)
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

        expect(response.status).toEqual(httpStatusCodes.created);
        expect(response.body.name).toEqual(name);
        expect(response.body.document).toEqual(document);
        expect(response.body.street).toEqual(street);
        expect(response.body.number).toEqual(number);
        expect(response.body.complement).toEqual(complement);
        expect(response.body.city).toEqual(city);
        expect(response.body.state).toEqual(state);
        expect(response.body.zipCode).toEqual(zipCode);
    });

    it('Should properly find a client', async () => {
        const name = 'John Cena';
        const document = "12345";
        const email = "john.cena@email.com";
        const street = "groove";
        const number = "13";
        const complement = "A";
        const city = "Los Santos";
        const state = "SA";
        const zipCode = "968574";

        const createEndpoint = '/client';

        const createResponse = await request(app)
            .post(createEndpoint)
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

        const findEndpoint = `/client?id=${createResponse.body.id}`;

        const findResponse = await request(app)
            .get(findEndpoint)
            .send()
        ;

        expect(findResponse.status).toEqual(httpStatusCodes.ok);
        expect(findResponse.body.name).toEqual(createResponse.body.name);
        expect(findResponse.body.document).toEqual(createResponse.body.document);
        expect(findResponse.body.street).toEqual(createResponse.body.street);
        expect(findResponse.body.number).toEqual(createResponse.body.number);
        expect(findResponse.body.complement).toEqual(createResponse.body.complement);
        expect(findResponse.body.city).toEqual(createResponse.body.city);
        expect(findResponse.body.state).toEqual(createResponse.body.state);
        expect(findResponse.body.zipCode).toEqual(createResponse.body.zipCode);
    });
});
