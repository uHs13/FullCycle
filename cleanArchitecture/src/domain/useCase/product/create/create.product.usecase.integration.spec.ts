import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";

describe('Create product use case integration tests', () => {
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

    it('Should properly create a product', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const input = {
            name: name,
            price: price,
            uuidGenerator: new UuidGenerator(),
        };

        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        const expectedOutput = {
            id: expect.any(String),
            name: input.name,
            price: input.price,
        };

        expect(output).toStrictEqual(expectedOutput);
    });
});
