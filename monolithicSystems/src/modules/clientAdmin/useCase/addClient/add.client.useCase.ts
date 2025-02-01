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
                document: input.document,
                email: input.email,
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            });

            const addedClient = await this.clientRepository.add(client);

            return {
                id: addedClient.id.value,
                name: addedClient.name,
                document: addedClient.document,
                email: addedClient.email,
                street: addedClient.street,
                number: addedClient.number,
                complement: addedClient.complement,
                city: addedClient.city,
                state: addedClient.state,
                zipCode: addedClient.zipCode,
            };
        } catch (error) {
            throw new Error('Was not possible to add the client');
        }
    }
}
