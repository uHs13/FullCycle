import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import ClientEntity from "../../domain/client.entity";
import ClientGatewayInterface from "../../gateway/client.gateway.interface";
import ClientModel from "./client.model.sequelize";

export default class ClientRepository implements ClientGatewayInterface {
    async add(client: ClientEntity): Promise<ClientEntity> {
        try {
            await ClientModel.create({
                id: client.id.value,
                name: client.name,
                email: client.email,
                address: client.address,
            });

            return client;
        } catch (error) {
            throw new Error('Was not possible to add the client')
        }
    }

    async find(id: string): Promise<ClientEntity> {
        try {
            const foundClient = await ClientModel.findOne({where: {id: id}});

            return new ClientEntity({
                id: new Uuid(foundClient.id),
                name: foundClient.name,
                email: foundClient.email,
                address: foundClient.address,
            })
        } catch (error) {
            throw new Error('Was not possible to find the client');
        }
    }
}
