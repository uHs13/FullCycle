import { AddClientFacadeInputDtoInterface, AddClientFacadeOutputDtoInterface } from "./addClient/add.client.facade.dto.interface";
import { FindClientFacadeInputDtoInterface, FindClientFacadeOutputDtoInterface } from "./findClient/find.client.facade.dto.interface";

export interface ClientAdminFacadeInterface {
    add(input: AddClientFacadeInputDtoInterface): Promise<AddClientFacadeOutputDtoInterface>;
    find(input: FindClientFacadeInputDtoInterface): Promise<FindClientFacadeOutputDtoInterface>;
}
