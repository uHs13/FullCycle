import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import ClientEntity from "../../domain/client.entity";
import ClientGatewayInterface from "../../gateway/client.gateway.interface";
import { AddClientUseCaseInputDto, AddClientUseCaseOutputDto } from "./add.client.useCase.dto";

export default class AddClientUseCase implements UseCaseInterface {
    private clientRepository: ClientGatewayInterface;

    constructor(repository: ClientGatewayInterface) {
        this.clientRepository = repository;
    }

    async execute(input: AddClientUseCaseInputDto): Promise<AddClientUseCaseOutputDto> {
        try {
            const client = new ClientEntity({
                id: new Uuid(),
                name: input.name,
                email: input.email,
                address: input.address,
            });

            const addedClient = await this.clientRepository.add(client);

            return {
                id: addedClient.id.value,
                name: addedClient.name,
                email: addedClient.email,
                address: addedClient.address
            };
        } catch (error) {
            throw new Error('Was not possible to add the client');
        }
    }
}
