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
                document: client.document,
                email: client.email,
                street: client.street,
                number: client.number,
                complement: client.complement,
                city: client.city,
                state: client.state,
                zipCode: client.zipCode,
            });

            return client;
        } catch (error) {
            throw new Error('Was not possible to add the client');
        }
    }

    async find(id: string): Promise<ClientEntity> {
        try {
            const foundClient = await ClientModel.findOne({where: {id: id}});

            return new ClientEntity({
                id: new Uuid(foundClient.id),
                name: foundClient.name,
                document: foundClient.document,
                email: foundClient.email,
                street: foundClient.street,
                number: foundClient.number,
                complement: foundClient.complement,
                city: foundClient.city,
                state: foundClient.state,
                zipCode: foundClient.zipCode,
            })
        } catch (error) {
            throw new Error('Was not possible to find the client');
        }
    }
}
