import RepositoryInterface from "../../@shared/repository/repositoryInterface";
import Order from "../entity/order";

export default class OrderRepository implements RepositoryInterface<Order> {
    create(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }

    find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
}
