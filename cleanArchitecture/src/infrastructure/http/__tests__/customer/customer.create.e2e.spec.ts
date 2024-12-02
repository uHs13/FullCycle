import {app, sequelize} from "../../express"
import request from "supertest";

describe('Create customer http endpoint end to end tests', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should properly create a customer', async () => {
        const endpoint = '/customer';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const response = await request(app)
            .post(endpoint)
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

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(name);
        expect(response.body.address.street).toBe(street);
        expect(response.body.address.number).toBe(number);
        expect(response.body.address.zipCode).toBe(zipCode);
        expect(response.body.address.city).toBe(city);
    });

    it('Should throw an error when the request is missing data', async () => {
        const endpoint = '/customer';

        const response = await request(app)
            .post(endpoint)
            .send({
                name: 'John Cena',
            })
        ;

        expect(response.status).toBe(500);
    });

    it('Should throw an error when name is invalid', async () => {
        const endpoint = '/customer';
        const name = '';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const response = await request(app)
            .post(endpoint)
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

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Name is required');
    });

    it('Should throw an error when address street is invalid', async () => {
        const endpoint = '/customer';
        const name = 'John Cena';
        const street = '';
        const number = 13;
        const zipCode = '1313';
        const city = 'city';

        const response = await request(app)
            .post(endpoint)
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

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Street is required');
    });

    it('Should throw an error when address number is invalid', async () => {
        const endpoint = '/customer';
        const name = 'John Cena';
        const street = 'street';
        const number = 0;
        const zipCode = '1313';
        const city = 'city';

        const response = await request(app)
            .post(endpoint)
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

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Number is required');
    });

    it('Should throw an error when address zip code is invalid', async () => {
        const endpoint = '/customer';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '';
        const city = 'city';

        const response = await request(app)
            .post(endpoint)
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

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Zip code is required');
    });

    it('Should throw an error when address city is invalid', async () => {
        const endpoint = '/customer';
        const name = 'John Cena';
        const street = 'street';
        const number = 13;
        const zipCode = '1313';
        const city = '';

        const response = await request(app)
            .post(endpoint)
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

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('City is required');
    });
});
