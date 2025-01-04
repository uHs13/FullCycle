import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Product from "../../domain/product.entity";
import ProductGatewayInterface from "../../gateway/product.gateway.interface";
import ProductModel from "./product.model.sequelize";

export default class ProductRepository implements ProductGatewayInterface {
    async findAll(): Promise<Product[]> {
        try {
            const foundProducts = await ProductModel.findAll();

            return foundProducts.map((product) => 
                new Product({
                    id: new Uuid(product.id),
                    name: product.name,
                    description: product.description,
                    sellingPrice: product.sellingPrice
                })
            );
        } catch (error) {
            throw new Error('Was not possible to find all products');
        }
    }

    async find(id: string): Promise<Product> {
        try {
            const foundProduct = await ProductModel.findOne({where: {id: id}});

            return new Product({
                id: new Uuid(foundProduct.id),
                name: foundProduct.name,
                description: foundProduct.description,
                sellingPrice: foundProduct.sellingPrice
            });
        } catch (error) {
            throw new Error('Was not possible to find the product');
        }
    }
}
