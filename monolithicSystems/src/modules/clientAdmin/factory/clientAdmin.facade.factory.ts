import ClientAdminFacade from "../facade/clientAdmin.facade";
import { ClientAdminFacadeInterface } from "../facade/clientAdmin.facade.interface";
import ClientRepository from "../repository/sequelize/client.repository";
import AddClientUseCase from "../useCase/addClient/add.client.useCase";
import FindClientUseCase from "../useCase/findClient/find.client.useCase";

export default class ClientAdminFacadeFactory {
    make(): ClientAdminFacadeInterface {
        const clientRepository = new ClientRepository();

        const facadeProperties = {
            addClientUseCase: new AddClientUseCase(clientRepository),
            findClientUseCase: new FindClientUseCase(clientRepository),
        };

        return new ClientAdminFacade(facadeProperties);
    }
}
