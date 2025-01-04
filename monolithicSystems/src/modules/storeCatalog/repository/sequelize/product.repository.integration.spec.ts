import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model.sequelize";
import ProductRepository from "./product.repository";
import Uuid from "../../../@shared/domain/valueObject/uuid.value.object";
import Product from "../../domain/product.entity";

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

    it('Should properly find all products', async () => {
        const productInfo = {
            id: 'eb27c299-686a-4c0d-b831-e14195b9f429',
            name: 'product',
            description: 'description',
            sellingPrice: 13
        };

        await ProductModel.create(productInfo);

        const productTwoInfo = {
            id: 'ac33a2f3-cc6e-49d9-9720-987053db7e9c',
            name: 'product two',
            description: 'description two',
            sellingPrice: 13
        };

        await ProductModel.create(productTwoInfo);

        const product = new Product({
            id: new Uuid(productInfo.id),
            name: productInfo.name,
            description: productInfo.description,
            sellingPrice: productInfo.sellingPrice,
        });

        const productTwo = new Product({
            id: new Uuid(productTwoInfo.id),
            name: productTwoInfo.name,
            description: productTwoInfo.description,
            sellingPrice: productTwoInfo.sellingPrice,
        });

        const foundProducts = await (new ProductRepository()).findAll();

        expect(foundProducts.length).toBe(2);
        expect(foundProducts[0].id.value).toEqual(product.id.value);
        expect(foundProducts[0].name).toEqual(product.name);
        expect(foundProducts[0].description).toEqual(product.description);
        expect(foundProducts[0].sellingPrice).toEqual(product.sellingPrice);
        expect(foundProducts[1].id.value).toEqual(productTwo.id.value);
        expect(foundProducts[1].name).toEqual(productTwo.name);
        expect(foundProducts[1].description).toEqual(productTwo.description);
        expect(foundProducts[1].sellingPrice).toEqual(productTwo.sellingPrice);
    });

    it('Should properly find a product', async () => {
        const productInfo = {
            id: 'eb27c299-686a-4c0d-b831-e14195b9f429',
            name: 'product',
            description: 'description',
            sellingPrice: 13
        };

        await ProductModel.create(productInfo);

        const product = new Product({
            id: new Uuid(productInfo.id),
            name: productInfo.name,
            description: productInfo.description,
            sellingPrice: productInfo.sellingPrice,
        });

        const foundProduct = await (new ProductRepository()).find(productInfo.id);

        expect(foundProduct.id.value).toEqual(product.id.value);
        expect(foundProduct.name).toEqual(product.name);
        expect(foundProduct.description).toEqual(product.description);
        expect(foundProduct.sellingPrice).toEqual(product.sellingPrice);
    });
});
