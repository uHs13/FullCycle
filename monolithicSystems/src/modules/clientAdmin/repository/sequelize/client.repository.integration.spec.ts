import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model.sequelize";
import ClientEntity from "../../domain/client.entity";
import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import ClientRepository from "./client.repository";

describe('Client repository integration tests', () => {
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

    it('Should properly add a client', async () => {
        const clientRepository = new ClientRepository();

        const uuid = new Uuid();
        const name = 'name';
        const email = 'email';
        const address = 'address';

        const client = new ClientEntity({
            id: uuid,
            name: name,
            email: email,
            address: address
        });

        const output = await clientRepository.add(client);

        expect(output.id.value).toEqual(uuid.value);
        expect(output.name).toEqual(name);
        expect(output.email).toEqual(email);
        expect(output.address).toEqual(address);
    });

    it('Should properly find a client', async () => {
        const clientRepository = new ClientRepository();

        const uuid = new Uuid();
        const name = 'name';
        const email = 'email';
        const address = 'address';

        const client = new ClientEntity({
            id: uuid,
            name: name,
            email: email,
            address: address
        });

        await clientRepository.add(client);

        const foundClient = await clientRepository.find(uuid.value);

        expect(foundClient.id.value).toEqual(uuid.value);
        expect(foundClient.name).toEqual(name);
        expect(foundClient.email).toEqual(email);
        expect(foundClient.address).toEqual(address);
    });
});
