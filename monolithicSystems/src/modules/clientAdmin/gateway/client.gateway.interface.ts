import ClientEntity from "../domain/client.entity";

export default interface ClientGatewayInterface {
    add(client: ClientEntity): Promise<ClientEntity>;
    find(id: string): Promise<ClientEntity>;
}
