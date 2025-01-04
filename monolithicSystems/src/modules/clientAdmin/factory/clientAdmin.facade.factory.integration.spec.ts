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
        const email = 'email';
        const address = 'address';

        const input = {
            name: name,
            email: email,
            address: address
        };

        const output = await facade.add(input);

        expect(output.id).toBeDefined();
        expect(output.name).toEqual(name);
        expect(output.email).toEqual(email);
        expect(output.address).toEqual(address);
    });

    it('Should properly find a client', async () => {
        const facade = new ClientAdminFacadeFactory().make();

        const name = 'name';
        const email = 'email';
        const address = 'address';

        const input = {
            name: name,
            email: email,
            address: address
        };

        const createdClient = await facade.add(input);

        const output = await facade.find({id: createdClient.id});

        expect(output.id).toEqual(createdClient.id);
        expect(output.name).toEqual(createdClient.name);
        expect(output.email).toEqual(createdClient.email);
        expect(output.address).toEqual(createdClient.address);
    });
});
