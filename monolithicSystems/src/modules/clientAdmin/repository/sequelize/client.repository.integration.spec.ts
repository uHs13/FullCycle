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
        const document = 'document';
        const email = 'email';
        const street = 'street';
        const number = 'number';
        const complement = 'complement';
        const city = 'city';
        const state = 'state';
        const zipCode = 'zipCode';

        const client = new ClientEntity({
            id: uuid,
            name: name,
            document: document,
            email: email,
            street: street,
            number: number,
            complement: complement,
            city: city,
            state: state,
            zipCode: zipCode,
        });

        const output = await clientRepository.add(client);

        expect(output.id.value).toEqual(uuid.value);
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
        const clientRepository = new ClientRepository();

        const uuid = new Uuid();
        const name = 'name';
        const document = 'document';
        const email = 'email';
        const street = 'street';
        const number = 'number';
        const complement = 'complement';
        const city = 'city';
        const state = 'state';
        const zipCode = 'zipCode';

        const client = new ClientEntity({
            id: uuid,
            name: name,
            document: document,
            email: email,
            street: street,
            number: number,
            complement: complement,
            city: city,
            state: state,
            zipCode: zipCode,
        });

        await clientRepository.add(client);

        const foundClient = await clientRepository.find(uuid.value);

        expect(foundClient.id.value).toEqual(uuid.value);
        expect(foundClient.name).toEqual(name);
        expect(foundClient.document).toEqual(document);
        expect(foundClient.email).toEqual(email);
        expect(foundClient.street).toEqual(street);
        expect(foundClient.number).toEqual(number);
        expect(foundClient.complement).toEqual(complement);
        expect(foundClient.city).toEqual(city);
        expect(foundClient.state).toEqual(state);
        expect(foundClient.zipCode).toEqual(zipCode);
    });
});
