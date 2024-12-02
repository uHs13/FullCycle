import {app, sequelize} from "../../express"
import request from "supertest";

describe('Update customer http endpoint end to end tests', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should properly update a customer', async () => {
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

        const updateEndpoint = `/customer/${createResponse.body.id}`;

        const updatedName = 'John Cena Two';
        const updatedStreet = 'street Two';
        const updatedNumber = 13;
        const updatedZipCode = '1313 two';
        const updatedCity = 'city two';

        const updatedResponse = await request(app)
            .put(updateEndpoint)
            .send({
                name: updatedName,
                address: {
                    street: updatedStreet,
                    number: updatedNumber,
                    zipCode: updatedZipCode,
                    city: updatedCity
                }
            });
        ;

        const expectedOutput = {
            id: createResponse.body.id,
            name: updatedResponse.body.name,
            address: {
                street: updatedResponse.body.address.street,
                number: updatedResponse.body.address.number,
                zipCode: updatedResponse.body.address.zipCode,
                city: updatedResponse.body.address.city,
            }
        };

        expect(updatedResponse.status).toEqual(200);
        expect(updatedResponse.body).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when customer does not exist', async () => {
        const updateEndpoint = `/customer/invalid-uuid`;

        const updatedName = 'John Cena Two';
        const updatedStreet = 'street Two';
        const updatedNumber = 13;
        const updatedZipCode = '1313 two';
        const updatedCity = 'city two';

        const updatedResponse = await request(app)
            .put(updateEndpoint)
            .send({
                name: updatedName,
                address: {
                    street: updatedStreet,
                    number: updatedNumber,
                    zipCode: updatedZipCode,
                    city: updatedCity
                }
            });
        ;

        expect(updatedResponse.status).toEqual(500);
        expect(updatedResponse.body.error).toStrictEqual('Customer not found');
    });

    it('Should throw an error when customer name is not valid', async () => {
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

        const updateEndpoint = `/customer/${createResponse.body.id}`;

        const updatedName = '';
        const updatedStreet = 'street Two';
        const updatedNumber = 13;
        const updatedZipCode = '1313 two';
        const updatedCity = 'city two';

        const updatedResponse = await request(app)
            .put(updateEndpoint)
            .send({
                name: updatedName,
                address: {
                    street: updatedStreet,
                    number: updatedNumber,
                    zipCode: updatedZipCode,
                    city: updatedCity
                }
            });
        ;

        expect(updatedResponse.status).toEqual(500);
        expect(updatedResponse.body.error).toStrictEqual('Name is required');
    });

    it('Should throw an error when customer address street is not valid', async () => {
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

        const updateEndpoint = `/customer/${createResponse.body.id}`;

        const updatedName = 'John Cena';
        const updatedStreet = '';
        const updatedNumber = 13;
        const updatedZipCode = '1313 two';
        const updatedCity = 'city two';

        const updatedResponse = await request(app)
            .put(updateEndpoint)
            .send({
                name: updatedName,
                address: {
                    street: updatedStreet,
                    number: updatedNumber,
                    zipCode: updatedZipCode,
                    city: updatedCity
                }
            });
        ;

        expect(updatedResponse.status).toEqual(500);
        expect(updatedResponse.body.error).toStrictEqual('Street is required');
    });

    it('Should throw an error when customer address number is not valid', async () => {
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

        const updateEndpoint = `/customer/${createResponse.body.id}`;

        const updatedName = 'John Cena';
        const updatedStreet = 'street Two';
        const updatedNumber = 0;
        const updatedZipCode = '1313 two';
        const updatedCity = 'city two';

        const updatedResponse = await request(app)
            .put(updateEndpoint)
            .send({
                name: updatedName,
                address: {
                    street: updatedStreet,
                    number: updatedNumber,
                    zipCode: updatedZipCode,
                    city: updatedCity
                }
            });
        ;

        expect(updatedResponse.status).toEqual(500);
        expect(updatedResponse.body.error).toStrictEqual('Number is required');
    });

    it('Should throw an error when customer address zip code is not valid', async () => {
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

        const updateEndpoint = `/customer/${createResponse.body.id}`;

        const updatedName = 'John Cena';
        const updatedStreet = 'street Two';
        const updatedNumber = 13;
        const updatedZipCode = '';
        const updatedCity = 'city two';

        const updatedResponse = await request(app)
            .put(updateEndpoint)
            .send({
                name: updatedName,
                address: {
                    street: updatedStreet,
                    number: updatedNumber,
                    zipCode: updatedZipCode,
                    city: updatedCity
                }
            });
        ;

        expect(updatedResponse.status).toEqual(500);
        expect(updatedResponse.body.error).toStrictEqual('Zip code is required');
    });

    it('Should throw an error when customer address city is not valid', async () => {
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

        const updateEndpoint = `/customer/${createResponse.body.id}`;

        const updatedName = 'John Cena';
        const updatedStreet = 'street Two';
        const updatedNumber = 13;
        const updatedZipCode = '1313';
        const updatedCity = '';

        const updatedResponse = await request(app)
            .put(updateEndpoint)
            .send({
                name: updatedName,
                address: {
                    street: updatedStreet,
                    number: updatedNumber,
                    zipCode: updatedZipCode,
                    city: updatedCity
                }
            });
        ;

        expect(updatedResponse.status).toEqual(500);
        expect(updatedResponse.body.error).toStrictEqual('City is required');
    });
});
