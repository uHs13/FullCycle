import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe('List product use case integration tests', () => {
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

    it('Should properly find a product', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const createInput = {
            name: name,
            price: price,
            uuidGenerator: new UuidGenerator(),
        };

        const productRepository = new ProductRepository();
        const crateProductUseCase = new CreateProductUseCase(productRepository);

        const createdOutput = await crateProductUseCase.execute(createInput);

        const useCase = new UpdateProductUseCase(productRepository);

        const updatedName = 'Black and White T-shirt Two';

        const updateInput = {
            id: createdOutput.id,
            name: updatedName,
            price: createdOutput.price,
        }

        const expectedOutput = {
            id: updateInput.id,
            name: updateInput.name,
            price: updateInput.price,
        };

        const output = await useCase.execute(updateInput);

        expect(output).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when try to update an inexistent product', async () => {
        expect(async () => {
            const productRepository = new ProductRepository();
            const useCase = new UpdateProductUseCase(productRepository);

            const input = {
                id: 'inexistent-uuid',
                name: 'name',
                price: 13,
            };

            await useCase.execute(input);
        }).rejects.toThrow('Was not possible to find the product');
    });
});
