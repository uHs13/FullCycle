import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/sequelize/client.model.sequelize";
import ClientAdminFacadeFactory from "./clientAdmin.facade.factory";

describe('Client admin facade integration tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it('Should properly create a client', async () => {
        const facade = new ClientAdminFacadeFactory().make();

        const name = 'name';
        const document = 'document';
        const email = 'email';
        const street = 'street';
        const number = 'number';
        const complement = 'complement';
        const city = 'city';
        const state = 'state';
        const zipCode = 'zipCode';

        const input = {
            name: name,
            document: document,
            email: email,
            street: street,
            number: number,
            complement: complement,
            city: city,
            state: state,
            zipCode: zipCode,
        };

        const output = await facade.add(input);

        expect(output.id).toBeDefined();
        expect(output.name).toEqual(name);
        expect(output.document).toEqual(document);
        expect(output.email).toEqual(email);
        expect(output.street).toEqual(street);
        expect(output.number).toEqual(number);
        expect(output.complement).toEqual(complement);
        expect(output.city).toEqual(city);
        expect(output.state).toEqual(state);
        expect(output.zipCode).toEqual(zipCode);
    });

    it('Should properly find a client', async () => {
        const facade = new ClientAdminFacadeFactory().make();

        const name = 'name';
        const document = 'document';
        const email = 'email';
        const street = 'street';
        const number = 'number';
        const complement = 'complement';
        const city = 'city';
        const state = 'state';
        const zipCode = 'zipCode';

        const input = {
            name: name,
            document: document,
            email: email,
            street: street,
            number: number,
            complement: complement,
            city: city,
            state: state,
            zipCode: zipCode,
        };

        const createdClient = await facade.add(input);

        const output = await facade.find({id: createdClient.id});

        expect(output.id).toEqual(createdClient.id);
        expect(output.name).toEqual(name);
        expect(output.document).toEqual(document);
        expect(output.email).toEqual(email);
        expect(output.street).toEqual(street);
        expect(output.number).toEqual(number);
        expect(output.complement).toEqual(complement);
        expect(output.city).toEqual(city);
        expect(output.state).toEqual(state);
        expect(output.zipCode).toEqual(zipCode);
    });
});
