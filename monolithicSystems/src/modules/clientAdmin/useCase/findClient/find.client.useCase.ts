import UseCaseInterface from "../../../@shared/useCase/useCase.interface";
import ClientGatewayInterface from "../../gateway/client.gateway.interface";
import { FindClientUseCaseInputDto, FindClientUseCaseOutputDto } from "./find.client.useCase.dto";

export default class FindClientUseCase implements UseCaseInterface {
    private clientRepository: ClientGatewayInterface;

    constructor(repository: ClientGatewayInterface) {
        this.clientRepository = repository;
    }

    async execute(input: FindClientUseCaseInputDto): Promise<FindClientUseCaseOutputDto> {
        try {
            const foundClient = await this.clientRepository.find(input.id);

            return {
                id: foundClient.id.value,
                name: foundClient.name,
                email: foundClient.email,
                address: foundClient.address
            };
        } catch (error) {
            throw new Error('Was not possible to find the client');
        }
    }
}
