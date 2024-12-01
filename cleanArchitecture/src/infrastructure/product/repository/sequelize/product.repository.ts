import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/productRepositoryInterface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        try {
            await ProductModel.create({
                id: entity.id,
                name: entity.name,
                price: entity.price
            });
        } catch (error) {
            throw new Error('Was not possible to create the product');
        }
    }

    async update(entity: Product): Promise<void> {
        try {
            await ProductModel.update(
                {
                    name: entity.name,
                    price: entity.price,
                },
                {
                   where: {id: entity.id}
                }
            );
        } catch (error) {
            throw new Error('Was not possible to update the product');
        }
    }

    async find(id: string): Promise<Product> {
        try {
            const productModel = await ProductModel.findOne({where: {id}});

            return new Product(
                productModel.id,
                productModel.name,
                productModel.price
            );
        } catch(error) {
            throw new Error('Was not possible to find the product');
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            const productModels = await ProductModel.findAll();

            let products: Product[] = [];

            productModels.forEach(product => {
                products.push(new Product(
                    product.id,
                    product.name,
                    product.price
                ));
            });

            return products;
        } catch(error) {
            throw new Error('Was not possible to find all products');
        }
    }
}
