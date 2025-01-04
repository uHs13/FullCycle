import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import ClientEntity from "../../domain/client.entity";
import AddClientUseCase from "./add.client.useCase";

describe('Add client use case unit tests', () => {
    const uuid = new Uuid();
    const name = 'name';
    const email = 'email@email.com';
    const address = 'address';

    const clientMock = new ClientEntity({
        id: uuid,
        name: name,
        email: email,
        address: address
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
            email: email,
            address: address
        };

        const output = await useCase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(output.id).toEqual(uuid.value);
        expect(output.name).toEqual(name);
        expect(output.email).toEqual(email);
        expect(output.address).toEqual(address);
    });
});
