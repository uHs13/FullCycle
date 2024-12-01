import Product from "../../../product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe('Find product use case unit tests', () => {
    const uuid = 'uuid';
    const name = 'Black and White T-shirt';
    const price = 13;

    const product = new Product(uuid, name, price);

    const mockProductRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn(),
        };
    };

    it('Should properly find a product', async () => {
        const productRepository = mockProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: uuid
        }

        const output = await useCase.execute(input);

        const expectedOutput = {
            id: input.id,
            name: product.name,
            price: product.price,
        };

        expect(output).toStrictEqual(expectedOutput);
    });

    it('Should throw an error when the product was not found', async () => {
        const errorMessage = 'Was not possible to find the product';
        expect(async () => {
            const productRepository = mockProductRepository();

            const useCase = new FindProductUseCase(productRepository);

            const input = {
                id: uuid
            }

            productRepository.find.mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await useCase.execute(input);
        }).rejects.toThrow(errorMessage);
    });
});
