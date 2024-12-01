import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

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

    it('Should properly list products', async () => {
        const name = 'Black and White T-shirt';
        const price = 13;

        const input = {
            name: name,
            price: price,
            uuidGenerator: new UuidGenerator(),
        };

        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const createdOutput = await createProductUseCase.execute(input);

        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        const expectedOutput = [
            {
                id: createdOutput.id,
                name: createdOutput.name,
                price: createdOutput.price,
            }
        ];

        expect(output).toStrictEqual({products: expectedOutput});
    });
});
