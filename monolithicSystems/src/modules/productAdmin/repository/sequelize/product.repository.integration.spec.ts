import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model.sequelize";
import Product from "../../domain/product.entity";
import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import ProductRepository from "./product.repository";

describe('Product repository integration tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it('Should properly create a product', async () => {
        const productRepository = new ProductRepository();

        const productProperties = {
            id: new Uuid(),
            name: 'Product',
            description: 'Description',
            purchasePrice: 13,
            stockAmount: 13,
        };

        const product = new Product(productProperties);

        await productRepository.add(product);

        const foundProduct = await ProductModel.findOne({
            where: {id: productProperties.id.value},
        });

        expect(productProperties.id.value).toEqual(foundProduct.id);
        expect(productProperties.name).toEqual(foundProduct.name);
        expect(productProperties.description).toEqual(foundProduct.description);
        expect(productProperties.purchasePrice).toEqual(foundProduct.purchasePrice);
        expect(productProperties.stockAmount).toEqual(foundProduct.stockAmount);
    });

    it('Should properly find a product', async () => {
        const productRepository = new ProductRepository();

        const productProperties = {
            id: new Uuid(),
            name: 'Product',
            description: 'Description',
            purchasePrice: 13,
            stockAmount: 13,
        };

        const product = new Product(productProperties);

        await productRepository.add(product);

        const foundProduct = await productRepository.find(productProperties.id.value);

        expect(productProperties.id.value).toEqual(foundProduct.id.value);
        expect(productProperties.name).toEqual(foundProduct.name);
        expect(productProperties.description).toEqual(foundProduct.description);
        expect(productProperties.purchasePrice).toEqual(foundProduct.purchasePrice);
        expect(productProperties.stockAmount).toEqual(foundProduct.stockAmount);
    });

    it('Should throw an error when product was not found', async () => {
        const uuid = 'b856de96-0643-42fa-b0b3-feace3052ebc';
        const errorMessage = `Was not possible to find the product '${uuid}'`;

        expect(async () => {
            await (new ProductRepository()).find(uuid);
        }).rejects.toThrow(errorMessage);
    });
});
