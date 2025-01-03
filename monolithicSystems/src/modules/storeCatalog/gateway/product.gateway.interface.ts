import Product from "../domain/product.entity";

export default interface ProductGatewayInterface {
    findAll(): Promise<Product[]>;
    find(id: string): Promise<Product>;
}
