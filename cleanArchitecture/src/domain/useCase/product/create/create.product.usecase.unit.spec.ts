import UuidGenerator from "../../../../infrastructure/uuid/uuid.generator";
import CreateProductUseCase from "./create.product.usecase";

describe('Create product unit tests', () => {
    const name = 'Black and White T-shirt';
    const price = 13;

    const input = {
        name: name,
        price: price,
        uuidGenerator: new UuidGenerator(),
    };

    const mockProductRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
        };
    };

    it('Should properly create a product', async () => {
        const productRepository = mockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        const expectedOutput = {
            id: expect.any(String),
            name: input.name,
            price: input.price,
        };

        expect(output).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when name is not valid', async () => {
        expect(async () => {
            const productRepository = mockProductRepository();
            const useCase = new CreateProductUseCase(productRepository);

            const input = {
                name: '',
                price: price,
                uuidGenerator: new UuidGenerator(),
            };

            await useCase.execute(input);
        }).rejects.toThrow('The name is required');
    });

    it('Should throw an error when price is not valid', async () => {
        expect(async () => {
            const productRepository = mockProductRepository();
            const useCase = new CreateProductUseCase(productRepository);

            const input = {
                name: name,
                price: -13,
                uuidGenerator: new UuidGenerator(),
            };

            await useCase.execute(input);
        }).rejects.toThrow('The price must be greater or equal to zero');
    });
});
