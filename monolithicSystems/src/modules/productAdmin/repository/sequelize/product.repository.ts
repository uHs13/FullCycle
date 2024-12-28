import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Product from "../../domain/product.entity";
import ProductGatewayInterface from "../../gateway/product.gateway";
import ProductModel from "./product.model.sequelize";

export default class ProductRepository implements ProductGatewayInterface {
    async add(product: Product): Promise<void> {
        try {
            await ProductModel.create({
                id: product.id.value,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stockAmount: product.stockAmount,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } catch (error) {
            throw new Error('Was not possible to create the product');
        }
    }

    async find(id: string): Promise<Product> {
        try {
            const foundProduct = await ProductModel.findOne({
                where: {id: id},
            });

            if (!foundProduct) {
                throw new Error(`Product '${id}' was not found`);
            }

            return new Product({
                id: new Uuid(foundProduct.id),
                name: foundProduct.name,
                description: foundProduct.description,
                purchasePrice: foundProduct.purchasePrice,
                stockAmount: foundProduct.stockAmount,
            });
        } catch (error) {
            throw new Error(`Was not possible to find the product '${id}'`);
        }
    }
}
