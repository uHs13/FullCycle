import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import ClientEntity from "../../domain/client.entity";
import FindClientUseCase from "./find.client.useCase";

describe('Find Client use case unit test', () => {
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

    it('Should properly find a client', async () => {
        const clientRepository = mockRepository();
        const useCase = new FindClientUseCase(clientRepository);

        const input = {
            id: uuid.value
        };

        const output = await useCase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(output.id).toEqual(uuid.value);
        expect(output.name).toEqual(name);
        expect(output.email).toEqual(email);
        expect(output.address).toEqual(address);
    });
});
