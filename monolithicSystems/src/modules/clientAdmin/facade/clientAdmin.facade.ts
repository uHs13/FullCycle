import UseCaseInterface from "../../@shared/useCase/useCase.interface";
import { AddClientFacadeInputDtoInterface, AddClientFacadeOutputDtoInterface } from "./addClient/add.client.facade.dto.interface";
import { ClientAdminFacadeInterface } from "./clientAdmin.facade.interface";
import { FindClientFacadeInputDtoInterface, FindClientFacadeOutputDtoInterface } from "./findClient/find.client.facade.dto.interface";

type FacadeProperties = {
    addClientUseCase: UseCaseInterface,
    findClientUseCase: UseCaseInterface,
};

export default class ClientAdminFacade implements ClientAdminFacadeInterface {
    private addClientUseCase: UseCaseInterface;
    private findClientUseCase: UseCaseInterface;

    constructor(facadeProperties: FacadeProperties) {
        this.addClientUseCase = facadeProperties.addClientUseCase;
        this.findClientUseCase = facadeProperties.findClientUseCase;
    }

    async add(input: AddClientFacadeInputDtoInterface): Promise<AddClientFacadeOutputDtoInterface> {
        return await this.addClientUseCase.execute(input);
    }

    async find(input: FindClientFacadeInputDtoInterface): Promise<FindClientFacadeOutputDtoInterface> {
        return await this.findClientUseCase.execute(input);
    }
}
