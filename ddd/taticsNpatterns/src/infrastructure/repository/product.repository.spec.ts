import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe('Product repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should properly create a product', async () => {
        const uuid = 'uuid';
        const name = 'Black Shirt';
        const price = 13;

        const productRepository = new ProductRepository();
        const product = new Product(uuid, name, price);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: uuid}});

        expect(productModel.toJSON()).toStrictEqual({
            id: uuid,
            name: name,
            price: price
        });
    });

    it('should properly update a product', async () => {
        const uuid = 'uuid';
        const name = 'Black Shirt';
        const price = 13;

        const productRepository = new ProductRepository();
        const product = new Product(uuid, name, price);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: uuid}});

        expect(productModel.toJSON()).toStrictEqual({
            id: uuid,
            name: name,
            price: price
        });

        const newName = 'Black and White Shirt';
        const newPrice = 15;

        product.changeName(newName);
        product.changePrice(newPrice);

        await productRepository.update(product);

        const productModelTwo = await ProductModel.findOne({where: {id: uuid}});

        expect(productModelTwo.toJSON()).toStrictEqual({
            id: uuid,
            name: newName,
            price: newPrice,
        });
    });

    it('should properly find a product', async () => {
        const uuid = 'uuid';
        const name = 'Black Shirt';
        const price = 13;

        const productRepository = new ProductRepository();
        const product = new Product(uuid, name, price);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: uuid}});

        const foundProduct = await productRepository.find(uuid);

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    it('should properly find all products', async () => {
        const uuid = 'uuid';
        const name = 'Black Shirt';
        const price = 13;

        const productRepository = new ProductRepository();
        const product = new Product(uuid, name, price);

        await productRepository.create(product);

        const uuidTwo = 'uuidTwo';
        const nameTwo = 'White Shirt';
        const priceTwo = 10;

        const productRepositoryTwo = new ProductRepository();
        const productTwo = new Product(uuidTwo, nameTwo, priceTwo);

        await productRepositoryTwo.create(productTwo);

        const foundProducts = await productRepositoryTwo.findAll();
        const products = [product, productTwo];

        expect(foundProducts).toEqual(products);
    });
});
