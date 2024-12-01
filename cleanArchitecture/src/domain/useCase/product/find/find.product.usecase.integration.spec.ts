import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import FindProductUseCase from "./find.product.usecase";

describe('Find product use case integration tests', () => {
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
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const createdOutput = await createProductUseCase.execute(createInput);

        const useCase = new FindProductUseCase(productRepository);

        const output = await useCase.execute({id: createdOutput.id});

        const expectedOutput = {
            id: createdOutput.id,
            name: createdOutput.name,
            price: createdOutput.price,
        };

        expect(output).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when product does not exist', async () => {
        expect(async () => {
            const input = {
                id: 'not-existent-uuid'
            }

            const productRepository = new ProductRepository();
            const useCase = new FindProductUseCase(productRepository);

            await useCase.execute(input);
        }).rejects.toThrow('Was not possible to find the product');
    });
});
