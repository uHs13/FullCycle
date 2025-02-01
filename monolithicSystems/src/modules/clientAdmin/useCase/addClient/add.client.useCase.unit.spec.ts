import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import ClientEntity from "../../domain/client.entity";
import AddClientUseCase from "./add.client.useCase";

describe('Add client use case unit tests', () => {
    const uuid = new Uuid();
    const name = 'name';
    const document = 'document';
    const email = 'email@email.com';
    const street = 'street';
    const number = 'number';
    const complement = 'complement';
    const city = 'city';
    const state = 'state';
    const zipCode = 'zipCode';

    const clientMock = new ClientEntity({
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

    const mockRepository = () => {
        return {
            add: jest.fn().mockReturnValue(Promise.resolve(clientMock)),
            find: jest.fn().mockReturnValue(Promise.resolve(clientMock))
        }
    };

    it('Should properly add a client', async () => {
        const clientRepository = mockRepository();
        const useCase = new AddClientUseCase(clientRepository);

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

        const output = await useCase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(output.id).toEqual(uuid.value);
        expect(output.name).toEqual(name);
        expect(output.email).toEqual(email);
        expect(output.street).toEqual(street);
        expect(output.number).toEqual(number);
        expect(output.complement).toEqual(complement);
        expect(output.city).toEqual(city);
        expect(output.state).toEqual(state);
        expect(output.zipCode).toEqual(zipCode);
    });
});
